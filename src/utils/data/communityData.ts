import { backend } from "../../App";

export const getCommunityAsync = async function (pk:Number) {
  try {
    let res = await fetch(`${backend}/community/community/${pk}`, {
      method: "GET",
      credentials: "include", // include cookies in the request
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1] ),
      },
    })
    let data = await res.json();
    return data
  } catch (error) {
    console.log(error);
  }
}

/**
 * Gets a list of community info
 * @param pks array of pks
 * @returns commmunityData[]
 */
export const getCommunityListAsync = async function (pks:Number[]) {
  try {
    let res = await fetch(`${backend}/community/community/list`, {
      method: "POST",
      credentials: "include", // include cookies in the request
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1] ),
      },
      body: JSON.stringify({
        communities: pks,
      }),
    })
    let data = await res.json();
    return data
  } catch (error) {
    console.log(error);
  }
}

/**
 * Search for communities
 * @param content search string
 * @returns communityData[]
 */
export const getSearchCommunitiesAsync = async function (content: string) {
  try {
    let res = await fetch(`${backend}/community/community/search`, {
      method: "POST",
      credentials: "include", // include cookies in the request
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1] ),
      },
      body: JSON.stringify({
        content: content,
      })
    })
    let data = await res.json();
    return data;
  } catch (error) { console.log(error); };
}

export const joinCommunityAsync = async function (pk:Number) {
  try {
    let res = await fetch(`${backend}/users/user/update/communities`, {
      method: "POST",
      credentials: "include", // include cookies in the request
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1] ),
      },
      body: JSON.stringify({
        fk_list: [pk],
      }),
    })
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const leaveCommunityAsync = async function (pk:Number) {
  try {
    let res = await fetch(`${backend}/users/user/delete/communities/${pk}`, {
      method: "DELETE",
      credentials: "include", // include cookies in the request
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": String(document.cookie?.match(/csrftoken=([\w-]+)/)?.[1] ),
      },
    })
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Creates a community
 * @param name community name
 * @param description community description
 */
export const createCommunityAsync = async function (name:string, description: string) {
  try {
    let res = await fetch(`${backend}/community/community/create`, {
      method: "POST",
      headers: {
          "X-CSRFToken": String(
              document.cookie?.match(/csrftoken=([\w-]+)/)?.[1]
          ),
          "Content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
          name: name,
          description: description,
          privacy_level: 1,
      }),
    })
    console.log(res);
    return res;
  } catch (error) {console.log(error)}; 
}

