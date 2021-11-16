import CryptoJS from "crypto-js";

export const appendImages = (images, key) => {
  let allMedia = document.getElementById("allMedia");
  allMedia.innerHTML = "";
  let deviceWidth = window.innerWidth;
  try {
    for (let i in images) {
      let div = document.createElement("div");

      var bytes = CryptoJS.AES.decrypt(images[i].mediaData, key);
      var imageBase64 = bytes.toString(CryptoJS.enc.Utf8);
      console.log(imageBase64);
      let p = document.createElement("p");
      p.innerText = `${parseInt(i) + 1})\n`;
      var image = new Image();
      image.src = imageBase64;
      image.classList.add("img-fluid");
      image.style.width = deviceWidth < 768 ? "100%" : "70%";
      image.style.marginLeft = deviceWidth < 768 ? "0" : "15%";

      let a = document.createElement("a");
      a.href = imageBase64;
      a.download = "image.png";
      a.classList.add("btn");
      a.classList.add("btn-success");
      a.classList.add("text-center");
      a.classList.add("my-3");
      a.text = "Download";
      let br = document.createElement("br");
      let hr = document.createElement("hr");

      div.appendChild(p);
      div.appendChild(image);
      div.appendChild(br);
      div.appendChild(a);
      div.appendChild(hr);
      div.style.margin = "10px";

      allMedia.appendChild(div);
    }
  } catch (error) {
    alert(error + " Meybe you have uploaded wrong key.");
    window.localStorage.removeItem("privateKey");
    window.localStorage.removeItem("user");
    window.location.assign("/login");
  }
};
