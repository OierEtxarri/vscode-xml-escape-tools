# XML Escape Tools

Extensión para Visual Studio Code que permite:

- Desescapar y formatear XML (`Ctrl + Alt + F`)
- Reescapar y compactar XML en una sola línea (`Ctrl + Alt + U`)

Ideal para trabajar con XML embebido en texto plano.

Muy útil a la hora de trabajar con eventos espontáneos de SOAP.

Para instalar:
```bash
npm init -y
npm install --save-dev vsce
npx vsce package

code --install-extension xml-escape-tools-1.0.0.vsix
```