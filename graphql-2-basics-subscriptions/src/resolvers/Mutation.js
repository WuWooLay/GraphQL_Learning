import uuidv4 from 'uuid/v4'

const Mutation = {
	/**
	 * @description User Mutation => Create/Delete/Update
	 */
	createUser(parent, args, ctx, info) {
		const { data } = args
		const { db } = ctx

		const userExist = db.users.some(user => user.email === data.email)

		if (userExist) {
			throw new Error('Already Email Created')
		}
		const newUser = {
			id: uuidv4(),
			...data
		}

		db.users.push(newUser)

		return newUser
	},
	deleteUser(parent, args, ctx, info) {
		const { db } = ctx
		const { id } = args

		const userIndex = db.users.findIndex(user => user.id === id)

		if (-1 === userIndex) {
			throw new Error('User Not FOund')
		}

		db.posts = db.posts.filter(post => {
			const match = post.author === id

			if (match) {
				db.comments = db.comments.filter(comment => comment.post !== post.id)
			}

			return !match
		})

		console.log('Delete Posts =>', db.posts)

		db.comments = db.comments.filter(comment => comment.author !== id)

		console.log('Delete Comments =>', db.comments)

		const delUser = db.users.splice(userIndex, 1)
		return delUser[0]
	},
	updateUser(parent, args, ctx, info) {
		const { db } = ctx
		const { id, data } = args
		let user = db.users.find(user => user.id === id)

		if (!user) {
			throw new Error(' User Not FOund ')
		}

		if (typeof data.name === 'string') {
			user.name = data.name
		}

		if (typeof data.email === 'string') {
			const emailTaken = db.users.some(user => user.email === data.email && user.id !== id)

			if (emailTaken) throw new Error('Email Alreay Used')

			user.email = data.email
		}

		if (typeof data.age !== 'undefined') {
			user.age = data.age
		}

		return user
	},

	/**
	 * @description Post Mutation => Create/Delete/Update
	 */
	createPost(parent, args, ctx, info) {
		const { db } = ctx
		const { data } = args

		const userExist = db.users.some(user => user.id === data.author)

		if (!userExist) {
			throw new Error('User Not Found')
		}

		const newPost = {
			id: uuidv4(),
			...args.data
		}

		db.posts.push(newPost)

		return newPost
	},
	deletePost(parent, args, ctx, info) {
		const { db } = ctx
		const { id } = args

		const postIndex = db.posts.findIndex(post => post.id === id)

		if (-1 === postIndex) {
			throw new Error(' Post Not Found')
		}

		const delPost = db.posts.splice(postIndex, 1)

		db.comments = db.comments.filter(comment => comment.post !== id)

		return delPost[0]
	},
	updatePost(parent, args, ctx, info) {
		const { db } = ctx

		const { id, data } = args

		const post = db.posts.find(post => post.id === id)

		if (!post) throw new Error('Post not found')

		if (typeof data.title === 'string') post.title = data.title
		if (typeof data.body === 'string') post.body = data.body
		if (typeof data.published === 'boolean') post.published = data.published

		return post
	},

	/**
	 * @description Comment Mutation => Create/Delete/Update
	 */
	createComment(parent, args, ctx, info) {
		const { db } = ctx
		const { data } = args

		console.log('args', data)

		const userExist = db.users.some(user => user.id === data.author)

		if (!userExist) {
			throw new Error('User Not Found')
		}

		const postExist = db.posts.some(post => {
			return post.id === data.post && post.published
		})

		if (!postExist) {
			throw new Error('Post Not Found and Doesnt Exist')
		}

		const newComment = {
			id: uuidv4(),
			...data
		}

		db.comments.push(newComment)

		return newComment
	},
	deleteComment(parent, args, ctx, info) {
		const { db } = ctx
		const { id } = args

		const commentIndex = db.comments.findIndex(comment => comment.id === id)

		if (-1 === commentIndex) {
			throw new Error("Comment Doesn't Found ")
		}

		const delComment = db.comments.splice(commentIndex, 1)

		return delComment[0]
	},
	updateComment(parent, args, ctx, info) {
		const { db } = ctx
		const { id, data } = args

		const comment = db.comments.find(comment => comment.id === id)
		if (!comment) throw new Error('Comment not found')

		if (typeof data.text === 'string') comment.text = data.text

		return comment
	}
}

export { Mutation as default }
