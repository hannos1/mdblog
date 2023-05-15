// import { marked } from 'marked';
const { marked } = require('marked');

const html = marked.parse('# Marked in Node.js\n\nRendered by **marked**.');
