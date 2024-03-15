export default function (context, options) {
  return {
    name: 'docusaurus-plugin-body',
    loadContent: async () => {
      return {remoteHeadTags: await fetchHeadTagsFromAPI()};
    },
    injectHtmlTags({content}) {
      return {
        postBodyTags: ["<script type='text/javascript'>" + \
			" var _gauges = _gauges || [];" +\
			" (function() {" + \
			" var t   = document.createElement('script');" + \
			" t.type  = 'text/javascript';" + \
			" t.async = true;" + \
			" t.id    = 'gauges-tracker';" + \
			" t.setAttribute('data-site-id', '65f4b25c10c5505dd7cbd30d');" + \
			" t.setAttribute('data-track-path', 'https://track.gaug.es/track.gif');" + \
   			" t.src = 'https://d2fuc4clr7gvcn.cloudfront.net/track.js';" + \
    			" var s = document.getElementsByTagName('script')[0];" + \
		    	" s.parentNode.insertBefore(t, s);" + \
			"  })();" + \
			" </script>"],
      };
    },
  };
}
