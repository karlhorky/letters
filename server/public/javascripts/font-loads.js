// Base typography: Avenir Next for paragraphs
FontFaceOnload( "AvenirNext", {
  success: function() {
    var docEl = document.documentElement;
    docEl.className += " avenirnext-loaded";
  }
});

// Libre Caslon Display for headers
FontFaceOnload( "LibreCaslonDisplay", {
  success: function() {
    var docEl = document.documentElement;
    docEl.className += " librecaslon-loaded";
  }
});

// Neue Haas Unica for unordered lists
FontFaceOnload( "NeueHaasUnica", {
  success: function() {
    var docEl = document.documentElement;
    docEl.className += " neuehaasunica-loaded";
  }
});

FontFaceOnload( "ProximaNova", {
  success: function() {
    var docEl = document.documentElement;
    docEl.className += " proximanova-loaded";
  }
});

FontFaceOnload( "CalendasPlus", {
  success: function() {
    var docEl = document.documentElement;
    docEl.className += " calendasplus-loaded";
  }
});
