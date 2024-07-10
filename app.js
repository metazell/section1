$(document).ready(function() {
const API_URL = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const ARTICLE_URL = 'https://hacker-news.firebaseio.com/v0/item/';


    function fetchStories() {
        $.getJSON(API_URL, function(data) {
            let topStories = data.slice(0, 4);
            $('#story-list').empty(); 
            topStories.forEach(function(storyId) {
                $.getJSON(ARTICLE_URL + storyId + '.json', function(story) {
                    $('#story-list').append(`
                        <div class="story">
                            <h2><a href="${story.url}" target="_blank">${story.title}</a></h2>
                            <p>Score: ${story.score}</p>
                            <p>By: ${story.by}</p>
                        </div>
                    `);
                });
            });
        });
    }

    fetchStories();

    $('#nav-all').click(function(e) {
        e.preventDefault();
        fetchStories();
    });

    $('#nav-submit').click(function(e) {
        e.preventDefault();
        $('#submit-form').toggle();
    });

    $('#new-story-form').submit(function(e) {
        e.preventDefault();
        const title = $('#title').val();
        const url = $('#url').val();
        const newStory = {
            title: title,
            url: url,
            score: 0,
            by: 'anonymous'
        };
        $('#story-list').prepend(`
            <div class="story">
                <h2><a href="${url}" target="_blank">${title}</a></h2>
                <p>Score: ${newStory.score}</p>
                <p>By: ${newStory.by}</p>
            </div>
        `);
        $('#submit-form').toggle();
        $('#new-story-form')[0].reset();
    });

});

