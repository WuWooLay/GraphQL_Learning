const User = {
	post(parent, args, ctx, info) {
		const { db } = ctx
		return db.posts.filter(post => post.author === parent.id)
	},
	comment(parent, args, ctx, info) {
		const { db } = ctx
		return db.comments.filter(comment => comment.author === parent.id)
	}
}

export { User as default }
