function getBlobURL(code, type){
    const blob = new Blob([code], { type })
    return URL.createObjectURL(blob)
};

function getGeneratedPageURL ({ html, css, js }) {
var cssURL = getBlobURL(css, 'text/css');
var jsURL = getBlobURL(js, 'text/javascript');

var source = `
  <html>
    <head>
      ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
      ${js && `<script src="${jsURL}"><\/script>`}
    </head>
    <body>
      ${html || ''}
    </body>
  </html>
`;
 return getBlobURL(source, 'text/html');
}

function update(){
var url = getGeneratedPageURL({
      html: eh.getValue(),
      css: ec.getValue(),
      js: ej.getValue()
    });

const iframe = document.querySelector('#result');
iframe.src = url;      
}
function setEditor(){
window.eh = ace.edit("htmleditor");
eh.setTheme("ace/theme/monokai"); //Hay 24 temas mas
eh.getSession().setMode("ace/mode/html"); //Tambien hay mas modos
//En el evento onchange actualizamos el iframe para mostrar el resultado
//Css
window.ec = ace.edit("csseditor");
ec.setTheme("ace/theme/monokai"); //Hay 24 temas mas
ec.getSession().setMode("ace/mode/css");
ec.setValue(ec.getValue(),1);
//Javascript
window.ej = ace.edit("jseditor");
ej.setTheme("ace/theme/monokai"); //Hay 24 temas mas
ej.getSession().setMode("ace/mode/javascript");


eh.getSession().on('change', function(){
    update(); //Creamos la funcion actualizar
});
ec.getSession().on('change', function(){
    update(); //Creamos la funcion actualizar
});
ej.getSession().on('change', function(){
    update(); //Creamos la funcion actualizar
});
}





setEditor();
update();