
function NotificationMessage(key, page) {

    let text
    //if (page == 'notification') {

    switch (key) {
        case "POST_LIKE":
            text = "likes  post"
            break;
        case 'POST_COMMENT':
            text = "comment on  post";
            break;

        case 'POST_TAGGED':
            text = "tagged  on their post";
            break;
        case 'PENDING_FRIEND_REQUEST':
            text = "new friend request ";
            break;
        case 'ACCEPTED_FRIEND_REQUEST':
            text = "acce ";
            break;
        default:
            text = "Looking forward to the Weekend";
    }
    // }
    return text
}

export default NotificationMessage