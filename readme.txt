RESTFUL ROUTES


Name         url            verb.           Desc.
=======================================================================

INDEX       /dogs.          GET.        Display a list of all dogs    
NEW         /dogs/new       GET.        Displays form to make a new dog
CREATE.     /dogs.          POST        Add new dogs to DB
SHOW.       /dogs/:id.      GET.        Shows info about one dog
EDIT.       /dogs/:id/edit  GET.        Show edit form for one dog
UPDATE.     /dogs/:id.      PUT.        Update a particular dog, then redirect somewhere
Destroy.    /dogs/:id.      DELETE.     Delete a particular dog, then redirect somewhere