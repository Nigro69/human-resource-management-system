const builderProps = {
  showHeader: true,
  downloadUrl: "download.html?file=",
  uploadUrl: "upload.html?file=",
  
  getFormFunc: (formname) => {
    var formurl = formname + ".json";
    var source = $.ajax({
      url: formurl,
      async: false,
    }).responseJSON;
    return source;
  },

  getAdditionalDataForControl:
    (control, { startIndex, pageSize, model }, callback) => {
      if (control.props["data-buildertype"] == "dictionary") {
        if (model == undefined) {
          model = "item";
        }
        var items = [];
        for (var i = 0; i < 3; i++) {
          var obj = {};
          obj.key = model + "_" + i;
          obj.text = model + "_" + i;
          obj.value = i;
          items.push(obj);
        }
        callback({ items });
      }
      else {
        var rowsCount = 5;
        var items = [];
        for (var i = 0; i < pageSize; i++) {
          var obj = {};
          if (control.props.columns == undefined) {
            obj["col1"] = "col1_" + (Number(startIndex) + Number(i));
            obj["col2"] = "col2_" + (Number(startIndex) + Number(i));
            obj["col3"] = "col3_" + (Number(startIndex) + Number(i));
          }
          else {
            control.props.columns.forEach(function (c) {
              obj[c.key] = c.key + "_" + (Number(startIndex) + Number(i));
            });
          }
          items.push(obj);
        }
        callback({ startIndex, pageSize, rowsCount, items });
      }
    },

  actions: [
    { text: "validate", icon: "browser" },
    { text: 'refresh', icon: "browser" },
    { text: 'save', icon: "browser" },
    { text: 'saveandexit', icon: "browser" },
    { text: 'cancel', icon: "browser" },
    { text: 'recalc', icon: "browser" },
    { text: 'add', icon: "browser" },
    { text: 'edit', icon: "browser" },
    { text: 'delete', icon: "browser" },
    { text: 'gridEdit', icon: "browser" },
    { text: 'gridDelete', icon: "browser" },
    { text: 'gridCopy', icon: "browser" },
    { text: 'gridAdd', icon: "browser" }
  ],

  templates: ["contactform", "toolbarbuttons"]
}

const viewerProps = {
  eventFunc: (obj, p) => console.log("Event from form:", obj, p),
  eventErrFunc: (obj, message) => alert("Error from the form: " + message),
  downloadUrl: "download.html?file=",
  uploadUrl: "upload.html?file=",
}

export { builderProps, viewerProps };