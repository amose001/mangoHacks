function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }

  var enableButton = document.getElementById('get_song');
    enableButton.disabled=false;
}
/* old non functioning code */
// function readURL(input) {
//   if (input.files && input.files[0]) {
//     var reader = new FileReader();
//
//     reader.onload = function (e) {
//       $('#blah')
//       .attr('src', e.target.result)
//
//       .width(360)
//       .height(640);
//     };
//     reader.readAsDataURL(input.files[0]);
//   }
// }
