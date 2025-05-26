import {BibLatexParser, CSLExporter} from "biblatex-csl-converter";

let inputBibtex = "";

process.stdin.on("readable", () => {
  let chunk = "";
  while (true) {
    chunk = process.stdin.read();
    if (chunk === null) {
      break;
    }
    inputBibtex += chunk;
  }
});

process.stdin.on("end", () => {
  let parser = new BibLatexParser(inputBibtex, {processUnexpected: true, processUnknown: true});
  let json = parser.parse();
  if (json.warnings.length > 0) {
    console.warn('WARNINGS:', json.warnings);
  }
  if (json.errors.length > 0) {
    console.error('ERRORS:', json.errors);
  }
  let exporter = new CSLExporter(json.entries, false, {useEntryKeys: true});
  let csl = Object.values(exporter.parse());
  process.stdout.write(JSON.stringify(csl) + '\n');
});
