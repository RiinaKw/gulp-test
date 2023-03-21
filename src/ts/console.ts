
jQuery(($) => {
  const $console = $('<div>').attr('id', 'js-console').appendTo('body');
  $('<div>').attr('id', 'console-width').appendTo($console);
  $('<div>').attr('id', 'console-height').appendTo($console);

  $('<div>').addClass('xs-only').text('media : xs').appendTo($console);
  $('<div>').addClass('sm-only').text('media : sm').appendTo($console);
  $('<div>').addClass('md-only').text('media : md').appendTo($console);
  $('<div>').addClass('lg-only').text('media : lg').appendTo($console);
  $('<div>').addClass('xl-only').text('media : xl').appendTo($console);

  $(window).on('load resize', () => {
    const width:number|undefined = $(window).width();
    const height:number|undefined = $(window).height();
    $('#console-width').text(`width : ${width}`);
    $('#console-height').text(`height : ${height}`);
  }).trigger('resize');
});
