const deleteBtn = document.querySelector('#delComBtn');

const deleteComment = async (event) => {
    event.preventDefault();

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    const currentTarget = $(event.currentTarget);
    console.log(currentTarget + "SEE THISSS ID");
    const commentId = currentTarget.attr('data-id');
    console.log(commentId + "COMMENT ID")

    const response = await fetch(`/api/comment/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'},
    });

    if (response.ok) {
        document.location.replace(`/post/${id}`);
    } else {
        alert (response.statusText);
    }
}

if(deleteBtn!=null){
    deleteBtn.addEventListener('click', deleteComment);
}