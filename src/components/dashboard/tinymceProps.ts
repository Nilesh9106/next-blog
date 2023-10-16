const initFullProps = {

  // plugins: 'preview   importcss  searchreplace autolink autosave save directionality  visualblocks visualchars fullscreen image link media  codesample table charmap pagebreak nonbreaking anchor  insertdatetime advlist lists  wordcount    help    charmap   quickbars  emoticons     ',
  plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
  editimage_cors_hosts: ['picsum.photos'],
  menubar: 'file edit view insert format tools table tc help',
  toolbar: "fullscreen | undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code  preview | save print | pagebreak anchor codesample | ltr rtl",

  image_advtab: true,
  mobile: {
    toolbar: "fullscreen | undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code  preview | save print | pagebreak anchor codesample | ltr rtl",
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
  },

  autosave_ask_before_unload: true,
  autosave_interval: '30s',
  autosave_prefix: '{path}{query}-{id}-',
  autosave_restore_when_empty: false,
  autosave_retention: '2m',
  importcss_append: true,
  image_caption: true,
  quickbars_selection_toolbar: 'bold italic | quicklink h1 h2 h3 blockquote quickimage',
  contextmenu: 'copy paste link image table',

  fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt",
  a11y_advanced_options: true,
  browser_spellcheck: true,
  language: "en",
  language_url: "/tinymce/langs/es.js",
  branding: false,
  width: "100%",
};

export default initFullProps;
