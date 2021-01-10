class Song {
    constructor(title, artist) {
        this.title = title;
        this.artist = artist;
    }

    describe() {
        return `"${this.title}" by ${this.artist}`;
    }
}

class Playlist {
    constructor(name) {
        this.name = name;
        this.songs = [];
    }
    //Appears on the console
    addSong(song) {
        if (song instanceof Song) { //let song = new Song();
            this.songs.push(song);
        } else {
            throw new Error(`You can only add an instance of ${song}.  Argument is not a song: ${song}`);
        }
    }
}

class Menu {
    constructor() {
        this.playlists = [];
        this.selectedPlaylist = null;
    }

    start() {
        let input = this.showMainMenuOptions();

        while (input != 0) {
            switch (input) {
                case '1':
                    this.createPlaylist();
                    break;
                case '2':
                    this.goToPlaylist();
                    break;
                case '3':
                    this.deletePlaylist();
                    break;
                case '4':
                    this.showAllPlaylists();
                    break;
                default:
                    input = 0;
            }
            input = this.showMainMenuOptions();
        }

        alert('Goodbye!')
    }


    showMainMenuOptions() {
        //Return the input that comes from the prompt
        return prompt(` 
        Welcome to the Playlist App!
        Create a new playlist to begin.

        0) Quit
        1) Create New Playlist
        2) Go To Playlist
        3) Delete Playlist
        4) Show All Playlists
        `);
    }

    showPlaylistMenuOptions(playlistInfo) {
        //Return the input that comes from the prompt
        return prompt(`
        0) Go Back To Main Menu
        1) Add Song
        2) Delete Song
        3) Play Song
        4) Shuffle Play
        ------------------
        ${playlistInfo}
        `);
    }

    showAllPlaylists() {
        let playlistString = '';
        for (let i = 0; i < this.playlists.length; i++) {
            playlistString += i + ') ' + this.playlists[i].name + '\n';
        }
        alert(playlistString);
    }

    createPlaylist() {
        let name = prompt('Enter the name of your new playlist: ')
        let newPlaylist = new Playlist(name);
        this.playlists.push(newPlaylist); //Push new instance of Playlist
        alert(newPlaylist.name + ' has been created!');
    }


    goToPlaylist() {
        let index = prompt('Enter the index of the playlist you want to explore:');
        if (index > -1 && index < this.playlists.length) { //Validate user input
            this.selectedPlaylist = this.playlists[index];
            let description = 'Playlist Name:  ' + this.selectedPlaylist.name + '\n';
            //Add song descriptions to playlist description
            for (let i = 0; i < this.selectedPlaylist.songs.length; i++) {
                description += i + ') ' + `"${this.selectedPlaylist.songs[i].title}"`
                    + ' - ' + this.selectedPlaylist.songs[i].artist + '\n';
            }

            let input = this.showPlaylistMenuOptions(description);
            switch (input) {
                case '1':
                    this.addSong();
                    break;
                case '2':
                    this.deleteSong();
                    break;
                case '3':
                    this.playSong();
                    break;
                case '4':
                    this.shufflePlay();
            }
        }
    }

    deletePlaylist() {
        let index = prompt(`Enter the index of the playlist you want to delete: `);
        if (index > -1 && index < this.playlists.length) {
            this.playlists.splice(index, 1);
        }
        alert(this.selectedPlaylist.name + ' has been deleted!');
    }

    addSong() {
        let title = prompt('Enter new song title: ');
        let artist = prompt('Enter new song artist: ');
        let addedSong = new Song(title, artist);
        this.selectedPlaylist.songs.push(addedSong);
        alert(addedSong.describe() + ' has been added to ' + this.selectedPlaylist.name + '!');
    }


    deleteSong() {
        let index = prompt('Enter the index of the song you want to delete: ');
        if (index > -1 && index < this.selectedPlaylist.songs.length) {
            let deletedSong = this.selectedPlaylist.songs[index];
            this.selectedPlaylist.songs.splice(index, 1);
            alert(deletedSong.describe() + ' has been deleted from ' + this.selectedPlaylist.name + '!');
        }

    }

    playSong() {
        let index = prompt('Enter the index of the song you want to play: ')
        if (index > -1 && index < this.selectedPlaylist.songs.length) {
            this.selectedSong = this.selectedPlaylist.songs[index];
            alert('Now playing: ' + this.selectedSong.describe());
        }
    }

    shufflePlay() {
        alert('Now playing: ' + this.selectedPlaylist.songs[Math.floor(Math.random()
            * this.selectedPlaylist.songs.length)].describe());
    }
}

let menu = new Menu();
menu.start();

