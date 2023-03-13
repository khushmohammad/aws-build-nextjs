import parse from 'html-react-parser';

export const NotificationMessage = (key) => {

    let text =""


    switch (key) {
        case "POST_LIKE":
            text = "likes your  post"
            break;
        case 'POST_COMMENT':
            text = "comment on your post";
            break;

        case 'POST_TAGGED':
            text = "tagged you on their post";
            break;
        case 'PENDING_FRIEND_REQUEST':
            text = "sent you friend request ";
            break;
        case 'ACCEPTED_FRIEND_REQUEST':
            text = " accepted your friend request ";
            break;
        default:
            text = "Looking forward to the Weekend";
    }

    return text
}


export const ActivityMessage = (key, receiverName) => {

    let text =""


    switch (key) {
        case "POST_LIKE":
            text = parse(`likes  <b>${receiverName}</b> post`)
            break;
        case 'POST_COMMENT':
            text = parse(`comment on <b>${receiverName}</b> post`);
            break;

        case 'POST_TAGGED':

            text = parse(`tagged on <b>${receiverName}</b> post`);

            break;
        case 'PENDING_FRIEND_REQUEST':
            text = "new friend request ";
            text = parse(`sent friend to <b>${receiverName}</b>`);

            break;
        case 'ACCEPTED_FRIEND_REQUEST':
            text = parse(`accepted ${receiverName}'s friend  requested</b>`);

            break;
        default:
            text = "Looking forward to the Weekend";
    }
    // }
    return text
}

