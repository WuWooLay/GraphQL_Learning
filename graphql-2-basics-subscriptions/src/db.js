const users = [
	{
		id: '1',
		name: 'Lwin Moe Paing',
		email: 'lwinmoepaing.dev@gmail.com',
		age: 23
	},
	{
		id: '2',
		name: 'Htet Naing Linn',
		email: 'htetnainglinn143@gmail.com',
		age: 23
	},
	{
		id: '3',
		name: 'Kaung Thu Lin',
		email: 'kaungthulin0@gmail.com',
		age: 23
	}
]

const posts = [
	{
		id: '1',
		title: 'Post Title 1 ',
		body: 'Post Body 1',
		published: false,
		author: '1'
	},
	{
		id: '2',
		title: 'Post Title 2 ',
		body: 'Post Body 2',
		published: true,
		author: '2'
	},
	{
		id: '3',
		title: 'Post Title 3 ',
		body: 'Post Body 3',
		published: true,
		author: '2'
	},
	{
		id: '4',
		title: 'Post Title 4 ',
		body: 'Post Body 4',
		published: true,
		author: '3'
	}
]

const comments = [
	{
		id: '1',
		text: 'Text Field',
		author: '1',
		post: '2'
	},
	{
		id: '2',
		text: 'Text Field',
		author: '2',
		post: '2'
	},
	{
		id: '3',
		text: 'Text Field',
		author: '3',
		post: '1'
	},
	{
		id: '4',
		text: 'Text Field',
		author: '2',
		post: '1'
	},
	{
		id: '5',
		text: 'Text Field',
		author: '3',
		post: '3'
	},
	{
		id: '6',
		text: 'Text Field',
		author: '1',
		post: '3'
	},
	{
		id: '7',
		text: 'Text Field',
		author: '1',
		post: '2'
	}
]
const db = { users, comments, posts }
export { db as default }
