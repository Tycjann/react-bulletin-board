const initialState = {
  users: [
    {
      id: '1',
      admin: '1',
      master: '1',
      email: 'mgucwa@gmail.com',
      name: 'Mirosław Gucwa',
      addDate: new Date('01-02-2022'),
    },
    {
      id: '2',
      admin: '0',
      master: '0',
      email: 'gucwa@post.pl',
      name: 'Mirosław Post Gucwa',
      addDate: new Date('01-02-2022'),
    },
  ],

  statuses: [
    {
      id: '1',
      status: 'draft',
    },
    {
      id: '2',
      status: 'published',
    },
    {
      id: '3',
      status: 'closed',
    },
  ],

  posts: [
    {
      id: '1',
      title: 'Post title I',
      authorId: '1',
      statusId: '1',
      price: '20',
      telephone: '123 345 678',
      content: 'Main content of the article... full text I.',
      publishedDate: new Date('01-02-2022'),
      editDate: new Date('01-02-2022'),
    },

    {
      id: '2',
      title: 'Post title II',
      authorId: '1',
      statusId: '2',
      price: '20',
      telephone: '123 345 678',
      content: 'Main content of the article... full text II.',
      publishedDate: new Date('02-02-2022'),
      editDate: new Date('02-02-2022'),
    },

    {
      id: '3',
      title: 'Post title III',
      authorId: '2',
      statusId: '2',
      price: '20',
      telephone: '123 345 678',
      content: 'Main content of the article... full text III.',
      publishedDate: new Date('03-02-2022'),
      editDate: new Date('03-02-2022'),
    },

    {
      id: '4',
      title: 'Post title IV',
      authorId: '2',
      statusId: '3',
      price: '20',
      telephone: '123 345 678',
      content: 'Main content of the article... full text IV.',
      publishedDate: new Date('04-02-2022'),
      editDate: new Date('08-02-2022'),
    },
  ],
};

export default initialState;
