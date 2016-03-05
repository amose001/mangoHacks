function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#blah')
      .attr('src', e.target.result)
      // var orientation = get_orientation(e.target.result)
      // if(orientation == 'landscape') {
        // .width(640)
        // .height(360);
      // }
    //   else if (orientation == 'portrait') {
        .width(360)
        .height(640);
    //   }
    //   else {
    //     .width(640)
    //     .height(640);
    //   }
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function get_orientation(src){

  img = new Image();
  img.src = src;
  var width = img.width;
  var height = img.height;
  height = height + height // Double the height to get best
  //height = height + (height / 2) // Increase height by 50%

  if(width > height) {
    return "landscape";
  } else if(height > width){
    return "portrait";
  } else {
    return "square";
  }

}
