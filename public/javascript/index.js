$(document).ready(() => {
    $('.music_delete').on('click', (e) => {
        $target = $(e.target)
        const id = $target.attr('data-id')
        $.ajax({
            type: 'DELETE',
            url: '/musics/'+id,
            success: () => {
                alert(`Musiqa o'chirildi`);
                window.location.href='/';
            },
            error: (err) => {console.log(err)}
        })
    })
})