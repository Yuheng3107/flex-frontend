import { backend } from "../../App";

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
  } catch (error) {
    console.log(error);
  }
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
  } catch (error) {
    console.log(error);
  }
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
  } catch (error) {
    console.log(error);
  }
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
  } catch (error) {
    console.log(error);
  }
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
  } catch (error) {
    console.log(error);
  }
}

export const createUserPostAsync = async function (postTitleInput:string, postTextInput:string) {
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
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const createCommunityPostAsync = async function (community:number, postTitleInput:string, postTextInput:string) {
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
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const createCommentAsync = async function (parent_type: number, parent_id: number, postTitleInput:string, postTextInput:string) {
  // check for valid parent type
  if (parent_type !== 15 && parent_type !== 16) return;
  try {
    let res = await fetch(`${backend}/feed/comment/create`, {
      method: "POST",
      headers: {
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]),
        "Content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        title: postTitleInput,
        text: postTextInput,
        parent_type: parent_type,
        parent_id: parent_id,
      }),
    })
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const likePostAsync = async function (post_type: number, id: number) {
  if (post_type !== 15 && post_type !== 16 && post_type !== 17) return;
  let url:RequestInfo = "";
  if (post_type === 15) url=`${backend}/feed/feed_post/update/likes`;
  if (post_type === 16) url=`${backend}/feed/feed_post/update/likes`;
  if (post_type === 17) url=`${backend}/feed/comment/update/likes`;
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
  } catch (error) {
    console.log(error);
  }
}

export const unlikePostAsync = async function (post_type: number, id: number) {
  if (post_type !== 15 && post_type !== 16 && post_type !== 17) return;
  let url:RequestInfo = "";
  if (post_type === 15) url=`${backend}/feed/feed_post/delete/likes/${id}`;
  if (post_type === 16) url=`${backend}/feed/feed_post/delete/likes/${id}`;
  if (post_type === 17) url=`${backend}/feed/comment/delete/likes/${id}`;
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
  } catch (error) {
    console.log(error);
  }
}