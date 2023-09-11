
//S3 이미지 경로 

//const IMG = `https://syos-test2.s3.ap-northeast-2.amazonaws.com/`
// const IMG = 'http://localhost:8000';


// //무한 스크롤 기능
// document.addEventListener("DOMContentLoaded", function () {
//     const postContainer = document.querySelector(".mood-box");
//     let lastPost = document.querySelector(".mood-itemwrap:last-child");

//     const options = {
//         threshold: 0.8, // 80%이상 보일 경우 콜백
//     };

//     // Intersection Observer 콜백 함수
//     function handleIntersection(entries, observer) {
//         entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//                 observer.unobserve(document.querySelector(".mood-itemwrap:last-child"));
//                 // 새로운 포스트를 3개 추가
//                 for (let i = 0; i < 3; i++) {
//                     createPost();
//                 }
//                 // 기존 마지막 포스트 업데이트
//                 lastPost = document.querySelector(".mood-itemwrap:last-child");
//                 observer.observe(lastPost); // 새로운 마지막 포스트를 관찰 시작
//             }
//         });
//     }

//     const observer = new IntersectionObserver(handleIntersection, options);
//     observer.observe(lastPost); // 초기에 마지막 포스트를 관찰 시작
// });


// // 스크롤이 마지막에 도달할 때 이미지 추가
// function createPost(user_id, title, content, image, category, liked, createAt) {
//     const postContainer = document.querySelector(".mood-box");
//     const newPost = document.createElement("div");
//     console.log(image)
//     // newPost.className = `mood type${category}`
//     newPost.className = "mood-itemwrap";
//     newPost.innerHTML = `
//     <div class="mood-item" >
//         <img src='${IMG + image}' alt="">
//     </div>
//     <div class="mood-item">
//         <img src='${IMG + image}' alt="">
//     </div>
//     <div class="mood-item">
//         <img src='${IMG + image}' alt="">
//     </div>
//       `;
//     postContainer.appendChild(newPost);
// }


//카테고리 버튼 
const button = document.querySelectorAll('.filter.button');
const filter = document.querySelectorAll('.filter');
console.log(button, filter)
for (let i = 0; i < button.length; i++) {
    button[i].addEventListener('click', function () {
        for (let j = 0; j < button.length; j++) {
            button[j].classList.remove('active');
        }
        this.classList.add('active');

        let dataFilter = this.getAttribute('data-filter');
        for (let k = 0; k < itemBox.length; k++) {
            itemBox[k].classList.remove('active');
            itemBox[k].classList.add('hide');


            if (itemBox[k].getAttribute('data-item') == dataFilter ||
                dataFilter == "all") {
                itemBox[k].classList.remove('hide');
                itemBox[k].classList.add('active');
            }
        }
    })
}


// 페이지 렌더될 때 데이터 가져오기
const fetchData = async () => {
    const res = await axios({
        method: "POST",
        url: "/board",
    });
    console.log(res);

    // 게시물 생성
    for (let i = 0; i < res.data.length; i++) {
        const postCreate = document.createElement("div");
        const container = document.getElementById("mood-itemwrap");
        postCreate.classList.add("item-box");

        // 게시물과 post_id 연결 
        postCreate.addEventListener('click', () => {
            location.href = `/board/${res.data[i].post_id}`;
        })

        postCreate.innerHTML = `
            
            <img src="${res.data[i].image}" />

            <div class="post-box" >
                    <div class="text-box">
                        <span> This is title: ${res.data[i].title}</span>
                    </div>

                    <div class="res-box">
                        <div class="heart-box">
                            <i class="fa-solid fa-heart" style="color: #f00000;"></i>                            
                            <p class="liked">${res.data[i].liked}</p>
                        </div>
                    
                        <div class="comment-box">
                            <i class="fa-regular fa-comment" style="color: #000000;"></i>
                            <p class="comment">${res.data[i].comment}</p>
                        </div>
                    </div>
            </div>`;

        container.appendChild(postCreate);
    }
}

fetchData();


// 최신순 정렬 
const LatestData = async () => {

    const latest = document.getElementById("latest");
    latest.addEventListener("click", async () => {
        const res = await axios({
            method: "POST",
            url: "/board/latest",
        });

        const container = document.getElementById("mood-itemwrap");
        container.innerHTML = "";

        for (let i = 0; i < res.data.length; i++) {
            const postCreate = document.createElement("div");
            const container = document.getElementById("mood-itemwrap");
            postCreate.classList.add("item-box");

            // 게시물과 post_id 연결 
            postCreate.addEventListener('click', () => {
                location.href = `/board/${res.data[i].post_id}`;
            })

            postCreate.innerHTML = `
            
            <img src="${res.data[i].image}" />

            <div class="post-box" >
                    <div class="text-box">
                        <span> This is title: ${res.data[i].title}</span>
                    </div>

                    <div class="res-box">
                        <div class="heart-box">
                            <i class="fa-solid fa-heart" style="color: #f00000;"></i>                            
                            <p class="liked">${res.data[i].liked}</p>
                        </div>
                    
                        <div class="comment-box">
                            <i class="fa-regular fa-comment" style="color: #000000;"></i>
                            <p class="comment">${res.data[i].comment}</p>
                        </div>
                    </div>
            </div>`;

            container.appendChild(postCreate);
        }

        console.log(res);

    });
}
LatestData();


// 오래된순 정렬 
const OldestData = async () => {

    const oldest = document.getElementById("oldest");
    oldest.addEventListener("click", async () => {
        const res = await axios({
            method: "POST",
            url: "/board/oldest",
        });

        const container = document.getElementById("mood-itemwrap");
        container.innerHTML = "";

        for (let i = 0; i < res.data.length; i++) {
            const postCreate = document.createElement("div");
            const container = document.getElementById("mood-itemwrap");
            postCreate.classList.add("item-box");

            // 게시물과 post_id 연결 
            postCreate.addEventListener('click', () => {
                location.href = `/board/${res.data[i].post_id}`;
            })

            postCreate.innerHTML = `
            
            <img src="${res.data[i].image}" />

            <div class="post-box" >
                    <div class="text-box">
                        <span> This is title: ${res.data[i].title}</span>
                    </div>

                    <div class="res-box">
                        <div class="heart-box">
                            <i class="fa-solid fa-heart" style="color: #f00000;"></i>                            
                            <p class="liked">${res.data[i].liked}</p>
                        </div>
                    
                        <div class="comment-box">
                            <i class="fa-regular fa-comment" style="color: #000000;"></i>
                            <p class="comment">${res.data[i].comment}</p>
                        </div>
                    </div>
            </div>`;

            container.appendChild(postCreate);
        }

        console.log(res);

    });
}

OldestData();


// 하트순 정렬 
const LikedData = async () => {

    const liked = document.getElementById("most-like");
    liked.addEventListener("click", async () => {
        const res = await axios({
            method: "POST",
            url: "/board/liked",
        });

        const container = document.getElementById("mood-itemwrap");
        container.innerHTML = "";

        for (let i = 0; i < res.data.length; i++) {
            const postCreate = document.createElement("div");
            const container = document.getElementById("mood-itemwrap");
            postCreate.classList.add("item-box");

            // 게시물과 post_id 연결 
            postCreate.addEventListener('click', () => {
                location.href = `/board/${res.data[i].post_id}`;
            })

            postCreate.innerHTML = `
            
            <img src="${res.data[i].image}" />

            <div class="post-box" >
                    <div class="text-box">
                        <span> This is title: ${res.data[i].title}</span>
                    </div>

                    <div class="res-box">
                        <div class="heart-box">
                            <i class="fa-solid fa-heart" style="color: #f00000;"></i>                            
                            <p class="liked">${res.data[i].liked}</p>
                        </div>
                    
                        <div class="comment-box">
                            <i class="fa-regular fa-comment" style="color: #000000;"></i>
                            <p class="comment">${res.data[i].comment}</p>
                        </div>
                    </div>
            </div>`;

            container.appendChild(postCreate);
        }

        console.log(res);

    });
}

LikedData();

// // ALL 버튼 눌렀을 때 모든 게시물 불러오기 
// const allData = async () => {

//     const all = document.getElementById("all");
//     all.addEventListener("click", async () => {
//         const res = await axios({
//             method: "POST",
//             url: "/board/all",
//         });

//         const container = document.getElementById("mood-itemwrap");
//         container.innerHTML = "";

//         for (let i = 0; i < res.data.length; i++) {
//             const postCreate = document.createElement("div");
//             const container = document.getElementById("mood-itemwrap");
//             postCreate.classList.add("item-box");

//             // 게시물과 post_id 연결 
//             postCreate.addEventListener('click', () => {
//                 location.href = `/board/${res.data[i].post_id}`;
//             })

//             postCreate.innerHTML = `
            
//             <img src="${res.data[i].image}" />

//             <div class="post-box" >
//                     <div class="text-box">
//                         <span> This is title: ${res.data[i].title}</span>
//                     </div>

//                     <div class="res-box">
//                         <div class="heart-box">
//                             <i class="fa-solid fa-heart" style="color: #f00000;"></i>                            
//                             <p class="liked">${res.data[i].liked}</p>
//                         </div>
                    
//                         <div class="comment-box">
//                             <i class="fa-regular fa-comment" style="color: #000000;"></i>
//                             <p class="comment">${res.data[i].comment}</p>
//                         </div>
//                     </div>
//             </div>`;

//             container.appendChild(postCreate);
//         }

//         console.log(res);

//     });
// }

// allData();


// 버튼 선택할 때마다 axios로 값 보내주기
const filterButtons = document.querySelectorAll('input[name="filter"]');
filterButtons.forEach((filter) => {
    filter.addEventListener('change', async () => {
        const posts = await axios({
           method: 'POST',
           url: '/board/filter',
           data: {filter: filter.value} 
        });
        // 결과값 받아오기
    })
});




