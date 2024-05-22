/**
 * Represents a note.
 * @class
 * @property {string} title - The title of the note.
 * @property {string} content - The content of the note.
 * @property {string[]} categories - The categories the note belongs to.
 * @param {string} title
 * @param {string} content.
 * @param {string[]} categories
 */
class NoteEntity {
  title = "";
  content = "";
  categories = [];
  constructor(title, content, categories) {
    this.title = title;
    this.content = content;
    this.categories = categories;
  }

  addCategory(category) {
    this.categories.push(category);
  }
}

export default NoteEntity;
