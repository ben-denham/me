import * as cheerio from "cheerio";

let inputHtml = "";

process.stdin.on("readable", () => {
  let chunk = "";
  while (true) {
    chunk = process.stdin.read();
    if (chunk === null) {
      break;
    }
    inputHtml += chunk;
  }
});

process.stdin.on("end", () => {
  const $ = cheerio.load(inputHtml);

  $('title').text('Dr Ben Denham');

  let script = `<script type="text/javascript">

// Increase initial zoom.
for (let i = 0; i < 5; i++) {
    zoomMore();
}

const startPage = "ben%20denham";
if (window.location.hash == "") {
  window.location.hash = startPage;
  const recordId = getRecordIdFromHash();
  console.log(recordId);
  if (recordId) {
    openRecord(recordId);
    zoomToNode(recordId);
  }
}

</script>`;
  $(script).appendTo('body');

  process.stdout.write($.html());
});
