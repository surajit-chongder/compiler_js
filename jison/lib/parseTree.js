var ParseTree = function (tree) {
    this.tree = tree;
};

ParseTree.prototype = {
    isLeftAndRightChildNotPresent: function () {
        return !this.tree.left.parent && !this.tree.right.parent;
    },

    isLeftAndRightChildBothPresent: function () {
        return this.tree.left.parent && this.tree.right.parent;
    },

    isLeftPresentButNotRight: function () {
        return this.tree.left.parent && !this.tree.right.parent;
    },

    isRightPresentButNotLeft: function () {
        return !this.tree.left.parent && this.tree.right.parent;
    },

    parse: function () {
        if (this.isLeftAndRightChildBothPresent()) {
            return this.represent(new ParseTree(this.tree.left).parse(), this.tree.parent, new ParseTree(this.tree.right));
        }
        if (this.isLeftAndRightChildNotPresent()) {
            return this.represent(this.tree.left, this.tree.parent, this.tree.right);
        }
        if (this.isLeftPresentButNotRight()) {
            return this.represent(new ParseTree(this.tree.left).parse(), this.tree.parent, this.tree.right);
        }
        if (this.isRightPresentButNotLeft()) {
            return this.represent(this.tree.left, this.tree.parent, new ParseTree(this.tree.right).parse());
        }
    },

    represent: function (left, parent, right) {
        return " ( " + left + this.signConvert(parent) + right + " )";
    },

    signConvert: function (sign) {
        var signSymbol = {"+": " plus ", "-": " minus ", '*': " times ", '/': " by "};
        return signSymbol[sign];
    }
};

module.exports = ParseTree;