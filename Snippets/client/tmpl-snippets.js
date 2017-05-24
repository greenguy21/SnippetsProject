Template.snippetss.helpers({
    snippets: function() {
        return Snippets.find().fetch();
    }
});