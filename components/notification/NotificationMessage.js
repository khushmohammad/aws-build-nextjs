
function NotificationMessage(key) {

    let text
    switch (key) {
        case "POST_LIKE":
            text = "likes your post"
            break;
        case 'POST_COMMENT':
            text = "comment on your post";
            break;

        case 'POST_TAGGED':
            text = "tagged you on their post";
            break;
        default:
            text = "Looking forward to the Weekend";
    }
    return text
}

export default NotificationMessage