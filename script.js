const uploadContent = document.querySelector(".upload-content");
const inputUploadImg = document.getElementById("upload-img");
const uploadPreview = document.querySelector(".upload-preview");
const previewImg = document.querySelector(".preview-img");
const btnRemoveImg = document.querySelector(".btn-remove-img");
const btnChangeImg = document.querySelector(".btn-change-img");
const uploadNote = document.querySelector(".upload-note");

document.addEventListener("dragover", (e) => {
  e.preventDefault();
});

document.addEventListener("drop", (e) => {
  e.preventDefault();
});

function showPreview(file) {
  if (!file || !file.type.startsWith("image/")) return;

  if (file.size > 500000) {
    uploadNote.closest(".form-group").classList.add("error");
    uploadNote.textContent =
      "File too large. Please upload a photo under 500KB";
    return;
  }

  const objectURL = URL.createObjectURL(file);

  if (previewImg.dataset.objectUrl) {
    URL.revokeObjectURL(previewImg.dataset.objectUrl);
  }

  previewImg.src = "";
  previewImg.src = objectURL;
  previewImg.dataset.objectUrl = objectURL;

  uploadContent.style.display = "none";
  uploadPreview.style.display = "flex";
}

function resetUpload() {
  previewImg.src = "";
  inputUploadImg.value = "";
  uploadContent.style.display = "block";
  uploadPreview.style.display = "none";
  uploadNote.closest(".form-group").classList.remove("error");
  uploadNote.textContent = "Upload your photo (JPG or PNG, max size: 500KB).";
}

inputUploadImg.addEventListener("change", () => {
  showPreview(inputUploadImg.files[0]);
});

btnRemoveImg.addEventListener("click", resetUpload);

btnChangeImg.addEventListener("click", () => inputUploadImg.click());

uploadContent.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadContent.classList.add("drag-over");
});

uploadContent.addEventListener("dragleave", () => {
  uploadContent.classList.remove("drag-over");
});

uploadContent.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadContent.classList.remove("drag-over");

  const file = e.dataTransfer.files[0];
  if (!file || !file.type.startsWith("image/")) return;

  if (file.size > 500000) {
    uploadNote.closest(".form-group").classList.add("error");
    uploadNote.textContent =
      "File too large. Please upload a photo under 500KB";
    return;
  }

  const dt = new DataTransfer();
  dt.items.add(file);
  inputUploadImg.files = dt.files;

  inputUploadImg.dispatchEvent(new Event("change"));
});
