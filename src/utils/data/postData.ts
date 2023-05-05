import { backend } from "../../App";
import { PostType } from "../../types/stateTypes";

export const getPostAsync = async function (post_id:number) {
  try {
    let res = await fetch(`${backend}/feed/feed_post/${post_id}`, {
      method: "GET",
      credentials: "include", // include cookies in the request
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]),
      }
    })
    let data = await res.json();
    return data
  } catch (error) { console.log(error); };
}

export const getUserPostsAsync = async function (user_id:number, set_no:number) {
  try {
    let res = await fetch(`${backend}/feed/feed_post/latest`, {
      method: "POST",
      credentials: "include", // include cookies in the request
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]),
      },
      body: JSON.stringify({
        user_id: user_id,
        set_no: set_no,
      })
    })
    let data = await res.json();
    return data
  } catch (error) { console.log(error); };
}

export const getCommunityPostsAsync = async function (community_id:number, set_no:number) {
  try {
    let res = await fetch(`${backend}/feed/community_post/latest`, {
      method: "POST",
      credentials: "include", // include cookies in the request
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]),
      },
      body: JSON.stringify({
        community_id: community_id,
        set_no: set_no,
      })
    })
    let data = await res.json();
    return data
  } catch (error) { console.log(error); };
}

export const getCommentsAsync = async function (comments: any[]) {
  try {
    let res = await fetch(`${backend}/feed/comment/list`, {
      method: "POST",
      credentials: "include", // include cookies in the request
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]),
      },
      body: JSON.stringify({
        comments: comments,
      })
    })
    let data = await res.json();
    return data
  } catch (error) { console.log(error); };
}

export const getUserFeedAsync = async function (set_no: number) {
  try {
    let res = await fetch(`${backend}/feed/feed`, {
      method: "POST",
      credentials: "include", // include cookies in the request
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1] ),
      },
      body: JSON.stringify({
        set_no: set_no,
      })
    })
    let data = await res.json();
    data.sort( function(a:any,b:any) {
      return new Date(b.posted_at) > new Date(a.posted_at);
    });
    return data
  } catch (error) { console.log(error); };
}

export const createUserPostAsync = async function (postTitleInput:string, postTextInput:string, media:FormData) {
  try {
    let res = await fetch(`${backend}/feed/user_post/create`, {
      method: "POST",
      headers: {
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]),
        "Content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        title: postTitleInput,
        text: postTextInput,
      }),
    })
    let pk: number = await res.json();
    if (res.ok === false || media.has('media') === false) return res;
    
    let res2 = await updateFeedPostMediaAsync(pk,media);
    console.log(res2);
    return res;
  } catch (error) { console.log(error); };
}

export const createCommunityPostAsync = async function (community:number, postTitleInput:string, postTextInput:string, media:FormData) {
  try {
    let res = await fetch(`${backend}/feed/community_post/create`, {
      method: "POST",
      headers: {
          "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]),
          "Content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
          community_id: community,
          title: postTitleInput,
          text: postTextInput,
      }),
    })
    let pk: number = await res.json();
    if (res.ok === false || media.has('media') === false) return res;
    
    let res2 = await updateFeedPostMediaAsync(pk,media);
    console.log(res2);
    return res;
  } catch (error) { console.log(error); };
}

const updateFeedPostMediaAsync = async function (pk: number, media: FormData) {
  try {
    let res = await fetch(`${backend}/feed/feed_post/update/media/${pk}`, {
      method: "POST",
      headers: {
          "X-CSRFToken": String(
              document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]
          ),
      },
      credentials: "include",
      body: media,
    })
    return res;
  } catch (error) { console.log(error); };
}

export const createCommentAsync = async function (parent_type: PostType, parent_id: number, postTitleInput:string, postTextInput:string) {
  // check for valid parent type
  try {
    let res = await fetch(`${backend}/feed/comment/create`, {
      method: "POST",
      headers: {
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]),
        "Content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        text: postTextInput,
        parent_type: parent_type === 'comment' ? 'comment' : 'feedpost',
        parent_id: parent_id,
      }),
    })
    return res;
  } catch (error) { console.log(error); };
}

export const likePostAsync = async function (post_type: PostType, id: number) {
  let url:RequestInfo = "";
  if (post_type === 'user'|| post_type === 'community') url=`${backend}/feed/feed_post/update/likes`;
  if (post_type === 'comment') url=`${backend}/feed/comment/update/likes`;
  try {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]),
        "Content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        id: id,
      }),
    })
    return res;
  } catch (error) { console.log(error); };
}

export const unlikePostAsync = async function (post_type: PostType, id: number) {
  let url:RequestInfo = "";
  if (post_type === 'user' || post_type === 'community') url=`${backend}/feed/feed_post/delete/likes/${id}`;
  if (post_type === 'comment') url=`${backend}/feed/comment/delete/likes/${id}`;
  try {
    let res = await fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]),
        "Content-type": "application/json"
      },
      credentials: "include",
    })
    return res;
  } catch (error) { console.log(error); };
}

export const getLikesAsync = async function (post_type: PostType, ids: number[]) {
  let url:RequestInfo = "";
  if (post_type === 'user'|| post_type === 'community') url=`${backend}/feed/feed_post/list/likes`;
  if (post_type === 'comment') url=`${backend}/feed/comment/list/likes`;
  try {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]),
        "Content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        ids: ids,
      }),
    })
    let data = await res.json();
    return data;
  } catch (error) { console.log(error); };
}