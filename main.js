let postsContainer = document.querySelector('#posts-container')
let loader = document.querySelector('.loader')
let filter = document.querySelector('#filter')
let clearInp = document.querySelector('#clearInp')
let limit = 8
let page = 1

window.addEventListener('load', function(){
    fetchPosts()
    filter.focus()
})

filter.addEventListener('input', function(filterTxt){
    filterPosts(filterTxt)
    checkInp()
})

// clearInp.addEventListener('click', emptyInp)

function fetchPosts() {
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
        .then(res => res.json())
        .then(posts => {
            console.log(posts)
            if (posts !== '') {
                posts.forEach(post => {
                    const postEl = document.createElement('div')
                    postEl.classList.add('post')
                    postEl.innerHTML =
                        `<div class="number">${post.id}</div>
            <div class="post-info">
                <p class="post-title">${post.title}</p>
                <p class="post-content">${post.body}</p>
            </div>`

                    postsContainer.appendChild(postEl)
                });
            }
        })
}

window.addEventListener('scroll', () => {

    // scrollTop is value from top 203
    const scrollTopPage = document.documentElement.scrollTop
    
    // scrollHeight is scrollable height 370
    const scrollHeightPage = document.documentElement.scrollHeight

    // clientHeight is visible area
    const clientHeightPage = document.documentElement.clientHeight
    
    if(scrollTopPage + clientHeightPage >= scrollHeightPage - 10){
        // console.log('we are at bottom. show loader and load next 5');
        showLoader()
    }
})

function showLoader(){
    setTimeout(() => {
        loader.classList.add('show')
    }, 300);

    setTimeout(() => {
        loader.classList.remove('show')
    }, 2700);

    setTimeout(() => {
        page++
        fetchPosts()
    }, 1000);
}

function filterPosts(filterTxt){
    // debug
    console.log('this ran')
    const inputVal = filterTxt.target.value
    const allPosts = document.querySelectorAll('.post')
    // debug
    console.log(allPosts)
    allPosts.forEach(post => {
        const postTitle = post.querySelector('.post-title').innerText.toLowerCase()
        const postContent = post.querySelector('.post-content').innerText.toLowerCase()
        // debug
        console.log(postContent);

        if(postTitle.indexOf(inputVal) > -1 || postContent.indexOf(inputVal) > -1){
            post.style.display = 'block'
        }
        else{
            post.style.display = 'none'
        }
    });
}

/* function emptyInp(){
    filter.value = ''
    filter.focus()
    fetchPosts()
} */

/* function checkInp(){
    if(filter.value !== ''){
        clearInp.style.display = 'flex'
    }
    else{
        clearInp.style.display = 'none'
    }
} */