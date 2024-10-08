const imageInput = document.getElementById('upload-image');
const imagePreview = document.getElementById('image-preview');
const cropBtn = document.getElementById('crop-btn');
const downloadBtn = document.getElementById('download-btn');

let cropper;


imageInput.addEventListener('change', function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            imagePreview.src = event.target.result;
            imagePreview.style.display = 'block';


            if (cropper) cropper.destroy();

            cropper = new Cropper(imagePreview, {
                aspectRatio: NaN,
                viewMode: 1,
                movable: true,
                zoomable: true,
                scalable: true,
                cropBoxResizable: true,
                cropBoxMovable: true,
                ready: function () {
                    cropBtn.disabled = false;
                }
            });
        };
        reader.readAsDataURL(file);
    }
});


cropBtn.addEventListener('click', function () {
    const canvas = cropper.getCroppedCanvas({
        width: cropper.getCropBoxData().width,
        height: cropper.getCropBoxData().height
    });


    downloadBtn.style.display = 'block';
    downloadBtn.href = canvas.toDataURL();
});
