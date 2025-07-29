import React, { useEffect, useRef } from "react";
import Layout from "@theme/Layout";

// FullCalendar & TOML
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import * as TOML from "toml";

// ------------------ ADAPTER JS ------------------
class FullCalendarSearchAdapter {
  constructor(config) {
    this.colorKeywords = config.colorKeywords || {};
    this.defaultColor = config.defaultColor || "#3788d8";
    this.attributeTypes = config.attributeTypes || {};
    this.searchContainer = config.searchContainer;
    this.tagsContainer = config.tagsContainer;
    this.resultMessageContainer = config.resultMessageContainer;
    this.maxRadioOptions = config.maxRadioOptions || 4;
    this.tomlParser = config.tomlParser;
    this.messageTemplate =
      config.messageTemplate || ((count) => `${count} événements trouvés`);
    this.onFiltered = config.onFiltered || (() => {});
    this.state = { events: [], filtered: [], filters: {}, struct: null };
  }

  parseFrontmatter(description) {
    const regex = /^\+{3}\s*\n([\s\S]*?)\n\+{3}\s*/;
    const match = description.match(regex);
    if (!match) return { frontmatter: {}, clean: description };
    const frontmatter = this.tomlParser(match[1]) || {};
    const clean = description.replace(regex, "").trim();
    return { frontmatter, clean };
  }

  mapVevents(vevents) {
    this.state.events = vevents.map((v) => {
      const { frontmatter, clean } = this.parseFrontmatter(v.description || "");
      const struct = frontmatter.struct || null;
      return {
        title: v.summary,
        start: v.start,
        end: v.end,
        location: v.location || "",
        color: this.resolveColor(v.summary),
        extendedProps: { ...frontmatter, struct, originalDescription: clean },
      };
    });
    this.updateSearchForm();
    this.applyFilters();
  }

  resolveColor(title) {
    for (const [kw, color] of Object.entries(this.colorKeywords)) {
      if (title.toLowerCase().includes(kw.toLowerCase())) return color;
    }
    return this.defaultColor;
  }

  hasStructField() {
    return this.state.events.some((e) => "struct" in e.extendedProps);
  }

  updateSearchForm() {
    const form = this.searchContainer;
    form.innerHTML = "";

    const hasStruct = this.hasStructField();
    const allAttrs = {};
    const commonKeys = this.getCommonKeys();

    if (hasStruct) {
      const structSet = new Set(
        this.state.events.map((e) => e.extendedProps.struct).filter(Boolean)
      );
      form.appendChild(this.buildStructSelector([...structSet]));

      this.state.events.forEach((e) => {
        if (
          !this.state.struct ||
          this.state.struct === "all" ||
          e.extendedProps.struct === this.state.struct
        ) {
          for (const k in e.extendedProps) {
            if (!allAttrs[k]) allAttrs[k] = new Set();
            const val = e.extendedProps[k];
            if (Array.isArray(val)) val.forEach((v) => allAttrs[k].add(v));
            else allAttrs[k].add(val);
          }
        }
      });
    } else {
      commonKeys.forEach((k) => {
        const type = this.attributeTypes[k] || "single";
        if (type !== "ignore") {
          allAttrs[k] = new Set();
          this.state.events.forEach((e) => {
            const val = e.extendedProps[k];
            if (Array.isArray(val)) val.forEach((v) => allAttrs[k].add(v));
            else allAttrs[k].add(val);
          });
        }
      });
    }

    for (const attr in allAttrs) {
      if (["struct", "originalDescription"].includes(attr)) continue;
      const type = this.attributeTypes[attr] || "single";
      if (type === "ignore") continue;
      const values = Array.from(allAttrs[attr]).filter(Boolean);
      const field = this.buildField(attr, type, values);
      form.appendChild(field);
    }
  }

  buildStructSelector(structs) {
    const wrapper = document.createElement("div");
    wrapper.className = "w-full";
    wrapper.innerHTML = `<label class="text-sm font-semibold block mb-1">Struct</label>`;
    const select = document.createElement("select");
    select.className = "w-full p-2 border border-gray-300 rounded-md";
    select.innerHTML =
      `<option value="all">(Tous)</option>` +
      structs.map((s) => `<option value="${s}">${s}</option>`).join("");
    select.value = this.state.struct || "all";
    select.addEventListener("change", (e) => {
      this.state.struct = e.target.value === "all" ? null : e.target.value;
      this.updateSearchForm();
      this.applyFilters();
    });
    wrapper.appendChild(select);
    return wrapper;
  }

  buildField(attr, type, values) {
    const wrapper = document.createElement("div");
    wrapper.className = "w-full sm:w-64";
    const label = document.createElement("label");
    label.textContent = attr;
    label.className = "text-sm font-semibold block mb-1";
    wrapper.appendChild(label);

    if (type === "fulltext") {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "w-full p-2 border border-gray-300 rounded-md";
      input.value = this.state.filters[attr] || "";
      input.addEventListener("input", (e) => {
        const v = e.target.value.trim();
        if (v) this.state.filters[attr] = v;
        else delete this.state.filters[attr];
        this.applyFilters();
      });
      wrapper.appendChild(input);
    } else if (type === "single") {
      if (values.length <= this.maxRadioOptions) {
        values.forEach((v) => {
          const div = document.createElement("div");
          div.className = "flex items-center";
          div.innerHTML = `
            <input class="mr-2 accent-blue-600" type="radio" name="${attr}" value="${v}" ${
            this.state.filters[attr] === v ? "checked" : ""
          }>
            <label>${v}</label>`;
          div.querySelector("input").addEventListener("change", (e) => {
            this.state.filters[attr] = e.target.value;
            this.applyFilters();
          });
          wrapper.appendChild(div);
        });
      } else {
        const select = document.createElement("select");
        select.className = "w-full p-2 border border-gray-300 rounded-md";
        select.innerHTML =
          `<option value="">(Tous)</option>` +
          values.map((v) => `<option value="${v}">${v}</option>`).join("");
        select.value = this.state.filters[attr] || "";
        select.addEventListener("change", (e) => {
          if (e.target.value) this.state.filters[attr] = e.target.value;
          else delete this.state.filters[attr];
          this.applyFilters();
        });
        wrapper.appendChild(select);
      }
    } else if (type === "multi") {
      values.forEach((v) => {
        const div = document.createElement("div");
        div.className = "flex items-center";
        const checked = (this.state.filters[attr] || []).includes(v);
        div.innerHTML = `
          <input class="mr-2 accent-blue-600" type="checkbox" name="${attr}" value="${v}" ${
          checked ? "checked" : ""
        }>
          <label>${v}</label>`;
        div.querySelector("input").addEventListener("change", (e) => {
          const list = this.state.filters[attr] || [];
          if (e.target.checked) list.push(v);
          else this.state.filters[attr] = list.filter((x) => x !== v);
          if (this.state.filters[attr].length === 0) delete this.state.filters[attr];
          this.applyFilters();
        });
        wrapper.appendChild(div);
      });
    }
    return wrapper;
  }

  getCommonKeys() {
    const keySets = this.state.events.map(
      (e) => new Set(Object.keys(e.extendedProps))
    );
    return [...keySets.reduce((a, b) => new Set([...a].filter((k) => b.has(k))))];
  }

  applyFilters() {
    const filtered = this.state.events.filter((e) => {
      if (this.state.struct && e.extendedProps.struct !== this.state.struct) return false;
      for (const [k, v] of Object.entries(this.state.filters)) {
        const val = e.extendedProps[k];
        const type = this.attributeTypes[k] || "single";
        if (type === "fulltext") {
          if (!val || !String(val).toLowerCase().includes(v.toLowerCase())) return false;
        } else if (type === "multi") {
          if (!Array.isArray(val) || !v.some((x) => val.includes(x))) return false;
        } else {
          if (val !== v) return false;
        }
      }
      return true;
    });

    this.state.filtered = filtered;
    this.updateTagDisplay();
    this.updateResultMessage();
    this.onFiltered(filtered);
  }

  updateTagDisplay() {
    const container = this.tagsContainer;
    container.innerHTML = "";
    for (const [k, v] of Object.entries(this.state.filters)) {
      const tag = document.createElement("span");
      tag.className =
        "flex items-center bg-blue-600 text-white text-sm rounded-full px-3 py-1";
      tag.textContent = `${k}: ${Array.isArray(v) ? v.join(",") : v}`;
      const btn = document.createElement("button");
      btn.innerHTML = "&times;";
      btn.className = "ml-2 hover:text-red-200 font-bold";
      btn.onclick = () => {
        delete this.state.filters[k];
        this.applyFilters();
      };
      tag.appendChild(btn);
      container.appendChild(tag);
    }
  }

  updateResultMessage() {
    if (this.resultMessageContainer) {
      this.resultMessageContainer.textContent = this.messageTemplate(
        this.state.filtered.length
      );
    }
  }
}

// ----------- UTILITY: Parse ICS to VEVENTS -----------
async function fetchAndParseICS(url) {
  const resp = await fetch(url);
  const text = await resp.text();

  const events = [];
  const veventBlocks = text.split("BEGIN:VEVENT").slice(1);
  for (const block of veventBlocks) {
    const lines = block.split("\n");
    let summary = "", description = "", location = "", start = "", end = "";
    for (const line of lines) {
      if (line.startsWith("SUMMARY:")) summary = line.replace("SUMMARY:", "").trim();
      else if (line.startsWith("DESCRIPTION:")) description = line.replace("DESCRIPTION:", "").trim();
      else if (line.startsWith("LOCATION:")) location = line.replace("LOCATION:", "").trim();
      else if (line.startsWith("DTSTART")) start = parseICSTime(line.split(":")[1]);
      else if (line.startsWith("DTEND")) end = parseICSTime(line.split(":")[1]);
    }
    events.push({ summary, description, location, start, end });
  }
  return events;
}

function parseICSTime(str) {
  // Supporte format "20250726T100000Z"
  const year = str.slice(0, 4);
  const month = str.slice(4, 6);
  const day = str.slice(6, 8);
  const hour = str.slice(9, 11);
  const min = str.slice(11, 13);
  const sec = str.slice(13, 15);
  return `${year}-${month}-${day}T${hour}:${min}:${sec}`;
}

// ----------------- PAGE COMPONENT -----------------
export default function CalendarPage() {
  const calendarRef = useRef(null);
  const searchRef = useRef(null);
  const tagsRef = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => {
    const calendarApi = calendarRef.current.getApi();

    const adapter = new FullCalendarSearchAdapter({
      searchContainer: searchRef.current,
      tagsContainer: tagsRef.current,
      resultMessageContainer: resultRef.current,
      tomlParser: TOML.parse,
      attributeTypes: {
        title: "fulltext",
        location: "fulltext",
        instruments: "ignore",
        styles: "ignore",
      },
      colorKeywords: {
        "[A]": "red",
        "[IC]": "grey",
        "[IO]": "green",
        "[ID]": "green",
        "🍺": "blue",
        "": "black",
      },
      onFiltered: (filteredEvents) => {
        calendarApi.removeAllEventSources();
        calendarApi.addEventSource(filteredEvents);
      },
    });

    // --- Charger les événements depuis ICS ---
    const icalUrl = "https://priv-calendar-zap.zikapanam.fr"; // <-- URL ICS à paramétrer
    fetchAndParseICS(icalUrl).then((vevents) => {
      adapter.mapVevents(vevents);
    });
  }, []);

  return (
    <Layout title="Calendrier">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Calendrier avec filtres dynamiques</h1>
        <div ref={searchRef} className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-lg mb-4"></div>
        <div ref={tagsRef} className="flex flex-wrap gap-2 mb-4"></div>
        <div ref={resultRef} className="text-sm text-gray-600 font-medium mb-4"></div>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={frLocale}
          events={[]}
          height="auto"
        />
      </div>
    </Layout>
  );
}
