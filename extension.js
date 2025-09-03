const vscode = require("vscode");


function replaceText(editor, transformFn) {
  const doc = editor.document;
  const selection = editor.selection;
  let range, text;
  if (!selection.isEmpty) {
    range = new vscode.Range(selection.start, selection.end);
    text = doc.getText(range);
  } else {
    text = doc.getText();
    range = new vscode.Range(doc.positionAt(0), doc.positionAt(text.length));
  }
  if (!text || text.trim() === "") {
    vscode.window.showWarningMessage("No hay texto para procesar.");
    return;
  }
  const newText = transformFn(text);
  return editor.edit((editBuilder) => {
    editBuilder.replace(range, newText);
  });
}

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand("xmlTools.unescapeAndFormat", () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;
      replaceText(editor, (text) => {
        // Desescapar entidades HTML
        let result = text
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"');
        // Añadir salto de línea entre etiquetas
        result = result.replace(/>(\s*)</g, ">\n<");
        return result;
      });
    }),

    vscode.commands.registerCommand("xmlTools.escapeAndCompact", () => {
      vscode.window.showInformationMessage("Comando XML: Escapar y Compactar ejecutado");
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage("No hay editor activo.");
        return;
      }
      const doc = editor.document;
      const selection = editor.selection;
      let range, text;
      if (!selection.isEmpty) {
        range = new vscode.Range(selection.start, selection.end);
        text = doc.getText(range);
      } else {
        text = doc.getText();
        range = new vscode.Range(doc.positionAt(0), doc.positionAt(text.length));
      }
      // Siempre mostrar notificación, aunque no haya texto
      if (!text || text.trim() === "") {
        vscode.window.showWarningMessage("No hay texto para procesar.");
        return;
      }
      // Lógica inversa al formateo: eliminar saltos de línea entre etiquetas y escapar caracteres
      let compacted = text.replace(/>\s*\n\s*</g, "><");
      compacted = compacted.replace(/\r?\n|\r/g, "");
      compacted = compacted.replace(/</g, "&lt;");
      compacted = compacted.replace(/>/g, "&gt;");
      compacted = compacted.replace(/"/g, "&quot;");
      editor.edit(editBuilder => {
        editBuilder.replace(range, compacted);
      });
    })
  );
}

exports.activate = activate;
exports.deactivate = () => {};
