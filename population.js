const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb://test:test135@ds115442.mlab.com:15442/document-reference',
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model(
  'Author',
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  })
);

const Course = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author'
    }
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course
  .find()
  .populate('author', 'name -_id')
  // gives us access to author collection, it shows name and exclude id
  .select('name, author');
  console.log(courses);
}

// createAuthor('Mosh', 'My bio', 'My Website');

// createCourse('Node Course', "5b69dcc51718dc3d60f068a5")

listCourses();
