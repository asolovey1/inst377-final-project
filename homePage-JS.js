async function planeSlider() {
    const randomPage = Math.floor(Math.random() * 20) + 1;

    const response = await fetch(`https://api.pexels.com/v1/search?query=plane&per_page=10&page=${randomPage}`, {
        headers: {
            Authorization: "ZLrY6p2mnylmR6UiDwu1Z8yUwjbT5Gr4b8fKlnQm4ZnPx978BFpxji3v"
        }
    });

    const data = await response.json();

    const wrapper = document.getElementById("flightWrapper");
    wrapper.innerHTML = "";

    data.photos.forEach(photo => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        slide.innerHTML = `<img src="${photo.src.medium}" style="width:100%; height:100%;">`;
        wrapper.appendChild(slide);
    });

    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        }
    });
}

window.onload = planeSlider;