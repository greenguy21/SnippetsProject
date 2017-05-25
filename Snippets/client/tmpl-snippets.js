Template.snippetss.helpers({
    snippetsy: function() {
        return Snippets.find().fetch();
    },
    isLink: function(){
        return (this.URL != undefined);
    }
});