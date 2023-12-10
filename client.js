// In your client.js file

document.addEventListener('DOMContentLoaded', () => {
    const dropButtons = document.querySelectorAll('.dropbtn');
    const dropContents = document.querySelectorAll('.drop-content');

    dropButtons.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            dropContents[index].classList.toggle('show');
        });
    });

    dropContents.forEach((content, index) => {
        content.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                const category = getCategory(index);
                const type = event.target.textContent.toLowerCase();

                window.location.href = `/${category}.html?type=${type}`;
            }
        });
    });
});

const getCategory = (index) => {
    const categories = ['morning', 'evening'];
    return categories[index];
};
