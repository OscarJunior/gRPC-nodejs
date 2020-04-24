function generateNoteBody(body) {
  const title = body.title || 'MY TITLE';
  const content = body.content || 'MY CONTENT';

  return {
    title,
    content,
  };
}

module.exports = { generateNoteBody };
