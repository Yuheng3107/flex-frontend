export type ProfileData = {
  id: number;
  achievements: Number[];
  username: string;
  email: string;
  profile_photo: string;
  bio?: string;
  followers?: Number[];
  reps?: number;
  perfect_reps?: number;
  friend_requests?: Number[];
  sent_friend_requests?: Number[];
  communities?: Number[];
};

export const emptyProfileData = {
  id: 0,
  achievements: new Array(),
  email: "",
  profile_photo: "",
  username: "",
  bio: "",
  followers: new Array(),
  reps: 0,
  perfect_reps: 0,
  friend_requests: new Array(),
  sent_friend_requests: new Array(),
  communities: new Array(),
};

export const invalidProfileData = {
  id: -1,
  achievements: [],
  email: "",
  profile_photo: "",
  username: "",
  bio: "",
};

export type UserPostData = {
  id: number;
  poster: number;
  posted_at: string;
  likes: number;
  likers: number[];
  text: string;
  title: string;
  community: number | null;
  media: string;
  comments: any[];
};

export const emptyUserPostData = {
  id: 0,
  poster: 0,
  posted_at: "",
  likes: 0,
  likers: [],
  text: "Lorem Ipsum",
  title: "Ipsum Lorem",
  community: null,
  media: "",
  comments: [],
};

export type ExerciseStats = {
  exercise_regimes: Number[];
  exercises: Number[];
  calories_burnt: number;
  streak: number;
  favorite_exercise: {
    exercise: number;
    perfect_reps: number;
    total_reps: number;
  };
  favorite_exercise_regime: {
    name: number;
    times_completed: number;
  };
};

export const emptyExerciseStats = {
  exercise_regimes: [],
  exercises: [],
  calories_burnt: 0,
  streak: 0,
  favorite_exercise: {
    exercise: 1,
    perfect_reps: 0,
    total_reps: 0,
  },
  favorite_exercise_regime: {
    name: 1,
    times_completed: 0,
  }
};
//An object containing the exercise's details like id, name, and description
export type ExerciseData = {
  id: number;
  likers: number[];
  likes: number;
  media: string;
  name: string;
  prefect_reps: number;
  posted_at: string;
  poster: string;
  shared_id: number;
  shared_type: number;
  tags: string[];
  text: string;
  total_reps: number;
}

export const emptyExerciseData = {
  id: 0,
  likers: [0],
  likes: 0,
  media: "",
  name: "",
  prefect_reps: 0,
  posted_at: "",
  poster: "",
  shared_id: 0,
  shared_type: 0,
  tags: [""],
  text: "",
  total_reps: 0,
}

export type CommunityData = {
  id: number;
  name: string;
  description: string;
  banner: string;
  community_photo: string;
  created_at: string;
  created_by: number;
  privacy_level: number;
  member_count: number;
};

export const emptyCommunityData = {
  id: 0,
  name: "",
  description: "",
  banner: "",
  community_photo: "",
  created_at: "",
  created_by: 0,
  privacy_level: 0,
  member_count: 0,
};

export const invalidCommunityData = {
  id: -1,
  name: "",
  description: "",
  banner: "",
  community_photo: "",
  created_at: "",
  created_by: 0,
  privacy_level: 0,
  member_count: 0,
};