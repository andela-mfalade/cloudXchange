
function showModal(event) {
  event.preventDefault();
  $('#myModal').show();
}

function hideModal() {
  $('#myModal').hide();
}

$("#the-file-input").change(function() {
    console.log(this.files);
});