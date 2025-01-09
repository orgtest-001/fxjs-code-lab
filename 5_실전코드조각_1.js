var users = [
    { id: 101, name: 'ID' },
    { id: 102, name: 'BJ' },
    { id: 103, name: 'PJ' },
    { id: 104, name: 'HA' },
    { id: 105, name: 'JE' },
    { id: 106, name: 'JI' }
];

var posts = [
    { id: 201, body: '내용1', user_id: 101 },
    { id: 202, body: '내용2', user_id: 102 },
    { id: 203, body: '내용3', user_id: 103 },
    { id: 204, body: '내용4', user_id: 102 },
    { id: 205, body: '내용5', user_id: 101 },
];

var comments = [
    { id: 301, body: '댓글1', user_id: 105, post_id: 201 },
    { id: 302, body: '댓글2', user_id: 104, post_id: 201 },
    { id: 303, body: '댓글3', user_id: 104, post_id: 202 },
    { id: 304, body: '댓글4', user_id: 105, post_id: 203 },
    { id: 305, body: '댓글5', user_id: 106, post_id: 203 },
    { id: 306, body: '댓글6', user_id: 106, post_id: 204 },
    { id: 307, body: '댓글7', user_id: 102, post_id: 205 },
    { id: 308, body: '댓글8', user_id: 103, post_id: 204 },
    { id: 309, body: '댓글9', user_id: 103, post_id: 202 },
    { id: 310, body: '댓글10', user_id: 105, post_id: 201 }
];

// 1. 특정인의 posts의 모든 commnets를 거르기
console.log(
    _.filter(posts, function(post) {
        return post.id === 101;
    })
)

_.go(
    _.filter(posts, function(post) {
        return post.id === 101;
    }),
    function(posts) {
        return _.filter(comments, function (commment) {
            _.find(posts, function(post) {
                return post.id === commment.post_id;
            });
        });
    },
    console.log
);

// upgrade

_.go(
    _.filter(posts, post => post.id === 101),
    _.map(post => post.id),
    post_ids => _.filter(comments, commment => _.contains(post_ids, commment.post_id),
    console.log
    )
);

_.go(
    _.filter(posts, post => post.id === 101),
    _.pluck('id'),
    post_ids => _.filter(comments, commment => _.contains(post_ids, commment.post_id),
    console.log
    )
);

_.go({ user_id: 101 },
    posts_by,
    comments_by_posts,
    console.log
);

function posts_by(attr) {
    return _.where(posts, attr);
}

var comments_by_posts = _.pipe(
    _.pluck('id'),
    post_ids => _.filter(comments, commment => _.contains(post_ids, commment.post_id))
);

var f1 = _.pipe(posts_by, comments_by_posts);
console.log(f1({ user_id: 101 }));

// 2. 특정인의 posts에 commnets를 단 친구의 이름을 뽑기

var user_names_by_comments = _.map(comment => _.find(users, user => user.id === comment.user_id)).name

var f2 = _.pipe(
    f1,
    user_names_by_comments,
    _.uniq
);

console.log(f2({ user_id: 101 }));

_.go( { user_id: 101 },
    posts_by,
    comments_by_posts,
    _.map(comment => _.find(users, user => user.id === comment.user_id)).name,
        _.uniq,
        console.log
)

// 3. 특정인의 posts에 commnets를 단 친구들 카운트 정보
var f3 = _.pipe(
    f1,
    comments_by_posts,
    _count_by
);

console.log(f3({ user_id: 101 }));

_.go( { user_id: 101 },
    posts_by,
    comments_by_posts,
    _.map(comment => _.find(users, user => user.id === comment.user_id)).name,
    _.count_by,
    console.log
)

// 4. 특정인이 commnet를 단 Posts 거르기
_.go(
    _.where(comments, {user_id: 105}),
    _.pluck('post_id'),
    _.uniq,
    function (post_ids) {
        return _.filter(posts, function (post) {
            return _.contains(post_ids, post.id);
        })
    },
    console.log
)

// 5. users + posts + comments (index_by와 group_by)로 효율성 높이기
// 데이터를 불변적으로 다루는게 핵심

var users2 = _.index_by(users, 'id');

// function find_user_by_id(user_id) {
//     return _find(users, function(user) {
//         return user.id === comment.user_id;
//     });
// }

function find_user_by_id(user_id) {
    return users2[user_id];
}

// var comments2 = _.map(comments, function(comment) {
//     return _.extend({
//     //    user: find_user_by_id(comment.user_id) // 중복 순회 발생
//         user: find_user_by_id(comment.user_id) // 효율 증가
//     }, comment); // 값 복사를 하게됨
// });

var comments2 = _.go(
    comments,
    _map(function (comment) {
        return _.extend({
            user: users2[comment.user_id],
        }, comment);
    }),
    _.group_by('post_id')
)

// var posts2 = _.map(posts, function(post) {
//     return _.extend(
//         {
//             comments: comments2[post.id],
//             user: find_user_by_id(post.user_id)
//     }, post);
// });

var posts2 = _.go(
    posts,
    _.map(function (post) {
        return _.extend({
            comments: comments2[post.id] || [],
            user: users2[post.user_id]
        }, post);
    }),
    _.group_by('user_id')
);


var users3 = _.map(users2, function(user) {
    return _.extend({
        posts: posts2[user.id] || []
    }, user);
});
// 참조값을 다루고 값을 순회하여 재귀하지 않는게 성능 및 strigify에 좋다.

// 5.1 특정인의 posts의 모든 comments 꺼내기
var user = users3[0];

_.go(
    user.posts,
    _.pluck('comments'),
    _.flatten,
    console.log
);

_.go(
    user,
    _.deep_pluck('posts.comments'),
    console.log
);

// 5.2 특정인의 posts에 commnets를 단 친구의 이름들 뽑기

_.go(
    user.posts,
    _.pluck('comments'),
    _.flatten,
    _.pluck('user'),
    _.pluck('name'),
    _.uniq,
    console.log
)

_.go(
    user,
    _.deep_pluck('posts.comments.user.name'),
    _.uniq,
    console.log
)


// 5.3 특정인의 posts에 comments를 단 친구들 카운트

_.go(
    user.posts,
    _.pluck('comments'),
    _.flatten,
    _.pluck('user'),
    _.pluck('name'),
    _.count_by,
    console.log
);

_.go(
    user,
    _.deep_pluck('posts.comments.user.name'),
    _.count_by,
    console.log
)

var posts3 = _.go(
    posts,
    _.map(function (post) {
        return _.extend({
            comments: comments2[post.id] || [],
            user: users2[post.user_id]
        }, post);
    }));

// 5.4 특정인이 comments를 단 posts 거르기
_.filter(posts3, function(post) {
    return _.find(post.comments, function(comment) {
        return comment.user_id === 105;
    })
})