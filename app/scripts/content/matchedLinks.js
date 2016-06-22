// import $ from 'jquery'
// export default initialize

// var linksData = {}

// function initialize() {
//   listenForMatchedLinkClicks()
// }

// function listenForMatchedLinkClicks() {
//   $("body").on('click', ".deepSearch-link-found", function(e) {
//     e.preventDefault()
//     // Using `prop` gets you the absolute path -- we store with as written
//     var href = $(this).parent().attr('href')
//     var matchString = linksData[href]
//       .slice(0,10)
//       .map(match => match.replace(/\s/, ' '))
//       .join('\n')
//     alert(matchString)
//   })

//   // just prevent default for consistency
//   $("body").on('click', ".deepSearch-link-not-found", function(e) {
//     e.preventDefault()
//   })
// }

// function storeLinkData(linkData) {
//   linksData[linkData.href] = linkData.matchesFound
// }
