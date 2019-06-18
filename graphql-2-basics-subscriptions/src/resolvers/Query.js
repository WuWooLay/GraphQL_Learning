/**
 *  Query Mean Like Get Method
 * 	GET ${url}/
 */

const Query = {
	me() {
		return {
			id: '1',
			name: 'Lwin Moe Paing',
			age: 23,
			email: 'lwinmoepaing.dev@gmail.com'
		}
	},

	users(parent, args, ctx, info) {
		const { db } = ctx
		return db.users
	},

	posts(parent, args, ctx, info) {
		const { db } = ctx
		console.log('Call post', db.posts)
		return db.posts
	},

	comments(parent, args, ctx, info) {
		const { db } = ctx
		console.log('Call Comment', db.comments)
		return db.comments
	}
}

export { Query as default }
