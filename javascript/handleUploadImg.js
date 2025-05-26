export function initImageUploader() {
  // Upload-related DOM elements
  const uploadBox = document.querySelector(".upload-box");
  const uploadContent = document.querySelector(".upload-content");
  const inputUploadImg = document.getElementById("upload-img");
  const uploadPreview = document.querySelector(".upload-preview");
  const previewImg = document.querySelector(".preview-img");
  const btnRemoveImg = document.querySelector(".btn-remove-img");
  const btnChangeImg = document.querySelector(".btn-change-img");
  const uploadNote = document.querySelector(".upload-note");

  // Avatar element to reflect the uploaded image
  const userAvatar = document.querySelector(".user-avatar");

  // Handle and preview uploaded image file
  function handleImageUpload(file) {
    if (!file || !file.type.startsWith("image/")) return;

    // Validate file size (max 500KB)
    if (file.size > 500000) {
      showError("File too large. Please upload a photo under 500KB");
      return;
    }

    // Generate a temporary URL for preview
    const imgLink = URL.createObjectURL(file);
    previewImg.src = imgLink;
    previewImg.alt = file.name;

    // Also update the user's avatar
    userAvatar.src = imgLink;
    userAvatar.alt = file.name;

    // Switch view from upload prompt to preview
    uploadContent.style.display = "none";
    uploadPreview.style.display = "flex";
    clearError();
  }

  // Show an error message under the upload section
  function showError(message) {
    uploadNote.closest(".form-group").classList.add("error");
    uploadNote.textContent = message;
  }

  // Reset any error messages and show the default upload note
  function clearError() {
    uploadNote.closest(".form-group").classList.remove("error");
    uploadNote.textContent = "Upload your photo (JPG or PNG, max size: 500KB).";
  }

  // When a file is selected via the input, handle the upload
  inputUploadImg.addEventListener("change", () => {
    handleImageUpload(inputUploadImg.files[0]);
  });

  // Highlight the upload box when dragging over it
  uploadBox.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadBox.classList.add("drag-over");
  });

  // Remove highlight when dragging leaves the box
  uploadBox.addEventListener("dragleave", () => {
    uploadBox.classList.remove("drag-over");
  });

  // Handle dropped file into the upload box
  uploadBox.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadBox.classList.remove("drag-over");
    handleImageUpload(e.dataTransfer.files[0]);
  });

  // Remove uploaded image and reset to initial state
  btnRemoveImg.addEventListener("click", () => {
    previewImg.src = "";
    previewImg.alt = "";
    inputUploadImg.value = "";
    uploadContent.style.display = "block";
    uploadPreview.style.display = "none";

    // Reset upload note
    uploadNote.closest(".form-group").classList.remove("error");
    uploadNote.textContent = "Upload your photo (JPG or PNG, max size: 500KB).";

    // Reset avatar
    userAvatar.src = "";
    userAvatar.alt = "";
  });

  // Trigger file input when "Change Image" button is clicked
  btnChangeImg.addEventListener("click", () => inputUploadImg.click());
}
