let artist = "";
let title = "";

document.getElementById("search-btn").addEventListener("click", function () {
    if (document.getElementById("search-result").childElementCount > 1) {
        for (let i = 0; i < 10; i++) {
            document.getElementById("search-result").removeChild(document.getElementById("search-result").lastChild);
        }
    }

    let searchText = document.getElementById("search-text").value;

    const url1 = "https://api.lyrics.ovh/suggest/";
    fetch(`${url1}${searchText}`)
        .then(res => res.json())
        .then(data1 => {
            for (let i = 0; i < 10; i++) {
                title = data1.data[i].title;
                artist = data1.data[i].artist.name;
                addNewResult();
            }
            const url2 = "https://api.lyrics.ovh/v1/";
            const lyricBtn = document.getElementsByClassName("lyric-btn");
            for (let i = 0; i < lyricBtn.length; i++) {
                const btn = lyricBtn[i];
                
                btn.addEventListener("click", function () {
                    document.getElementById("lyric").innerText = "";
                    document.getElementById("lyric-artist").innerText = "";
                    let lyricSong = this.parentElement.parentElement.querySelector("h3").innerText;
                    let lyricArtist = this.parentElement.parentElement.querySelector("span").innerText;
                    fetch(`${url2}${lyricArtist}/${lyricSong}`)
                        .then(res => res.json())
                        .then(data2 => {
                            document.getElementById("lyric").innerText = data2.lyrics;
                            document.getElementById("lyric-artist").innerText = `${lyricArtist} - ${lyricSong}`;
                            document.getElementById("lyric-artist").scrollIntoView();
                        })
                })
            }
        })

})

function addNewResult() {
    const item = document.getElementById("search-result").firstElementChild;
    const cln = item.cloneNode(true);
    cln.querySelector("h3").innerText = title;
    cln.querySelector("span").innerText = artist;
    cln.style.display = "block";
    cln.id = "";
    document.getElementById("search-result").appendChild(cln);
}