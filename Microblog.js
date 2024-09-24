document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postContent = document.getElementById('postContent');
    const postsContainer = document.getElementById('postsContainer');

    postForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const content = postContent.value.trim();

        if (content) {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post');

            // Add timestamp
            const timestamp = document.createElement('div');
            timestamp.classList.add('timestamp');
            timestamp.textContent = new Date().toLocaleString();
            postDiv.appendChild(timestamp);

            // Add post content
            const textPara = document.createElement('p');
            textPara.textContent = content;
            postDiv.appendChild(textPara);

            // Add like/dislike section
            const likeSection = document.createElement('div');
            likeSection.classList.add('like-section');

            const likeButton = document.createElement('button');
            likeButton.classList.add('like-button');
            likeButton.textContent = '👍';
            likeButton.dataset.count = 0; // Initialize like count
            likeButton.addEventListener('click', () => {
                likeButton.dataset.count = parseInt(likeButton.dataset.count) + 1;
                likeButton.textContent = `👍 (${likeButton.dataset.count})`;
            });
            likeSection.appendChild(likeButton);

            const dislikeButton = document.createElement('button');
            dislikeButton.classList.add('dislike-button');
            dislikeButton.textContent = '👎';
            dislikeButton.dataset.count = 0; // Initialize dislike count
            dislikeButton.addEventListener('click', () => {
                dislikeButton.dataset.count = parseInt(dislikeButton.dataset.count) + 1;
                dislikeButton.textContent = `👎 (${dislikeButton.dataset.count})`;
            });
            likeSection.appendChild(dislikeButton);

            postDiv.appendChild(likeSection);

            // Add comment section
            const commentSection = document.createElement('div');
            commentSection.classList.add('comment-section');
            const commentInput = document.createElement('input');
            commentInput.classList.add('comment-input');
            commentInput.placeholder = 'Add a comment...';
            const commentButton = document.createElement('button');
            commentButton.classList.add('comment-button');
            commentButton.textContent = 'Comment';

            commentButton.addEventListener('click', () => {
                if (commentInput.value.trim()) {
                    const commentText = document.createElement('p');
                    commentText.textContent = commentInput.value;
                    commentText.classList.add('comment-item');
                    commentSection.appendChild(commentText);
                    commentInput.value = ''; // Clear input
                }
            });

            commentSection.appendChild(commentInput);
            commentSection.appendChild(commentButton);
            postDiv.appendChild(commentSection);

            postsContainer.appendChild(postDiv);

            // Clear form fields
            postContent.value = '';
        }
    });
});
