import Note from "../../models/note.js";
import Response from "../../utils/Response.js";
/**
 * **NoteController** class provides methods for handling all operations related with
 * notes in the application.
 *
 * Methods
 * 1. create notes
 * 2. update notes
 * 3. delete notes
 * 4. list notes
 * 5. retrieve notess
 *
 */
class NoteController {
  /**
   * Creates a new note with title, content, and categories.
   *
   * @param {Object} req - The HTTP request object.
   * @param {string} req.body.title - The title of the note.
   * @param {string} req.body.content - The content of the note.
   * @param {string[]} req.body.categories - The categories of the note.
   * @param {Object} res - The HTTP response object.
   * @returns {Response} - A JSON response with status code, message, and the created note.
   */
  static createNote = async (req, res) => {
    const { title, content, categories } = req.body;
    if (!title || !content || !categories) {
      return res
        .status(400)
        .json(new Response(400, "Please fill all the fields", {}).getJson());
    } else {
      try {
        const note = new Note({
          title,
          content,
          categories,
        });

        const savedNote = await note.save();

        res
          .status(201)
          .json(
            new Response(201, "Note created successfully", savedNote).getJson()
          );
      } catch (error) {
        res.status(400).json(new Response(400, error.message, {}).getJson());
      }
    }
  };
  /**
   * Updates an existing note with its id.
   *
   * @param {Object} req - The HTTP request object.
   * @param {string} req.params.id - The id of the note to update.
   * @param {string} [req.body.title] - The new title of the note.[optional]
   * @param {string} [req.body.content] - The new content of the note.[optional]
   * @param {string[]} [req.body.categories] - The new categories of the note.[optional]
   * @param {Object} res - The HTTP response object.
   * @returns {Response} - A JSON response with status code, message, and the updated note.
   */
  static updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content, categories } = req.body;

    if (!id) {
      res
        .status(400)
        .json(new Response(400, "Please provide note id", {}).getJson());
    }

    if (!title && !content && !categories) {
      return res
        .status(400)
        .json(new Response(400, "Nothing to update", {}).getJson());
    }
    try {
      const updatedNote = await Note.findByIdAndUpdate(id, {
        title,
        content,
        categories,
      });

      if (!updatedNote) {
        res.status(404).json(new Response(404, "Note not found", {}).getJson());
      }

      res
        .status(200)
        .json(
          new Response(200, "Note updated successfully", updatedNote).getJson()
        );
    } catch (error) {
      res.status(400).json(new Response(400, error.message, {}).getJson());
    }
  };
  /**
   * Deletes a note with its id.
   *
   * @param {Object} req - The HTTP request object.
   * @param {string} req.params.id - The id of the note to delete.
   * @param {Object} res - The HTTP response object.
   * @returns {Response} - A JSON response with status code, messge, and the deleted note.
   */
  static deleteNote = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res
        .status(400)
        .json(new Response(400, "Please provide a valid id", {}).getJson());
    }

    try {
      const deletedNote = await Note.findByIdAndDelete(id);
      if (!deletedNote) {
        res.status(404).json(new Response(404, "Note not found", {}).getJson());
      }
      res
        .status(200)
        .json(
          new Response(200, "Note deleted successfully", deletedNote).getJson()
        );
    } catch (error) {
      res.status(400).json(new Response(400, error.message, {}).getJson());
    }
  };
  /**
   * Lists all notes, sorted by creation date in descending order.
   *
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   * @returns {Response} - A JSON response with status code, message, and list of notes.
   */
  static listNotes = async (req, res) => {
    try {
      const notes = await Note.find().sort({ createdAt: -1 });
      res
        .status(200)
        .json(new Response(200, "Notes found successfully", notes).getJson());
    } catch (error) {
      res.status(400).json(new Response(400, error.message, {}).getJson());
    }
  };
  /**
   * Gets a note with its id.
   *
   * @param {Object} req - The HTTP request object.
   * @param {string} req.params.id - The id of the note to get.
   * @param {Object} res - The HTTP response object.
   * @returns {Response} - A JSON response with status code, message, and retrieved note.
   */
  static getNote = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res
        .status(400)
        .json(new Response(400, "Please provide a valid id", {}).getJson());
    }

    try {
      const note = await Note.findById(id);
      if (!note) {
        res.status(404).json(new Response(404, "Note not found", {}).getJson());
      }
      res
        .status(200)
        .json(new Response(200, "Note found successfully", note).getJson());
    } catch (error) {
      res.status(400).json(new Response(400, error.message, {}).getJson());
    }
  };
}

export default NoteController;
