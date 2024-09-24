let posts = JSON.parse(localStorage.getItem('posts')) || []; // Load posts from localStorage

function createPost() {
    const postContent = document.getElementById('post-content').value;
    if (postContent.trim() === "") return; // Don't allow empty posts

    const post = {
        id: posts.length,
        content: postContent,
        likes: 0,
        unlikes: 0,
        date: new Date().toLocaleString(), // Current date and time
        comments: [] // Initialize comments as an empty array
    };

    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts)); // Save to localStorage
    document.getElementById('post-content').value = ''; // Clear textarea
    renderPosts(); // Re-render the posts
}

function renderPosts() {
    const feed = document.getElementById('feed');
    feed.innerHTML = ''; // Clear existing posts

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';

        const contentDiv = document.createElement('p');
        contentDiv.textContent = post.content;

        const dateDiv = document.createElement('p');
        dateDiv.className = 'post-date';
        dateDiv.textContent = Posted on: ${post.date}; // Display date

        const likeButton = document.createElement('button');
        likeButton.textContent = Like (${post.likes});
        likeButton.onclick = () => {
            post.likes++;
            localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
            renderPosts();
        };

        const unlikeButton = document.createElement('button');
        unlikeButton.textContent = Unlike (${post.unlikes});
        unlikeButton.onclick = () => {
            if (post.unlikes < post.likes) {
                post.unlikes++;
                localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
                renderPosts();
            }
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = Delete;
        deleteButton.onclick = () => {
            posts = posts.filter(p => p.id !== post.id); // Remove post by ID
            localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
            renderPosts();
        };

        // Comment section
        const commentInput = document.createElement('input');
        commentInput.type = 'text';
        commentInput.placeholder = 'Add a comment...';
        commentInput.className = 'comment-input';

        const commentButton = document.createElement('button');
        commentButton.textContent = 'Comment';
        commentButton.onclick = () => {
            if (commentInput.value.trim() !== "") {
                const comment = {
                    content: commentInput.value.trim(),
                    likes: 0 // Initialize likes for the comment
                };
                post.comments.push(comment);
                commentInput.value = ''; // Clear input field
                localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
                renderPosts(); // Re-render to show comments
            }
        };

        const commentsDiv = document.createElement('div');
        post.comments.forEach((comment) => {
            const commentDiv = document.createElement('div');
            const commentText = document.createElement('p');
            commentText.textContent = comment.content;

            const likeCommentButton = document.createElement('button');
            likeCommentButton.textContent = Like (${comment.likes});
            likeCommentButton.onclick = () => {
                comment.likes++;
                localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
                renderPosts(); // Re-render to show updated like count
            };

            commentDiv.appendChild(commentText);
            commentDiv.appendChild(likeCommentButton);
            commentsDiv.appendChild(commentDiv);
        });

        // Count of comments
        const commentCount = document.createElement('p');
        commentCount.textContent = Comments (${post.comments.length});

        // Display likes and unlikes counts
        const likesCount = document.createElement('p');
        likesCount.textContent = Likes: ${post.likes};
        const unlikesCount = document.createElement('p');
        unlikesCount.textContent = Unlikes: ${post.unlikes};

        // Append elements to postDiv
        postDiv.appendChild(contentDiv);
        postDiv.appendChild(dateDiv);
        postDiv.appendChild(likeButton);
        postDiv.appendChild(unlikeButton);
        postDiv.appendChild(deleteButton);
        postDiv.appendChild(commentInput); // Add comment input
        postDiv.appendChild(commentButton); // Add comment button
        postDiv.appendChild(commentCount); // Add comment count
        postDiv.appendChild(likesCount); // Add likes count
        postDiv.appendChild(unlikesCount); // Add unlikes count
        postDiv.appendChild(commentsDiv); // Add comments display

        feed.appendChild(postDiv);
    });
}

// Initial call to render posts from localStorage
renderPosts();
