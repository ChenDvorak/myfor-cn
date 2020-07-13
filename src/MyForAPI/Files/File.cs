using Common;
using DB;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Files
{

    public class File
    {
        public static string SaveWebPath => Config.GetValue("File:SaveWebPath");

        /// <summary>
        /// 获取临时文件夹的绝对路径
        /// </summary>
        public static string SaveTemplateAbsoluteDirectory => GetDirectory("File:Template");

        /// <summary>
        /// 获取缩略图文件夹的绝对路径
        /// </summary>
        public static string SaveThumbnailAbsoluteDirectory => GetDirectory("File:SaveThumbnailWebPath");

        private static string GetDirectory(string config)
        {
            var temp = Directory.GetCurrentDirectory() + Config.GetValue(config);
            if (!Directory.Exists(temp))
                Directory.CreateDirectory(temp);
            return temp;
        }

        /// <summary>
        /// save file info to DB
        /// </summary>
        /// <param name="fileInfo">file info</param>
        /// <returns>id of file in DB</returns>
        public static async Task<(bool, int)> SaveToDBAsync(string fileName, string saveName, long size)
        {
            await using var db = new MyForDbContext();
            DB.Tables.File newFileModel = new DB.Tables.File
            {
                Name = fileName,
                SaveName = saveName,
                Extension = Path.GetExtension(fileName),
                Size = size
            };

            await db.AddAsync(newFileModel);
            bool success = await db.SaveChangesAsync() == 1;

            return (success, success ? newFileModel.Id : -1);
        }

        /// <summary>
        /// delete file
        /// </summary>
        /// <param name="saveFileName"></param>
        public static void Delete(string saveFileName)
        {
            string saveWebPath = Config.GetValue("File:SaveWebPath");
            var currentDirectory = Directory.GetCurrentDirectory();
            string fullFileName = Path.Combine(currentDirectory + saveWebPath, saveFileName);
            DeleteFile(fullFileName);
        }
        /// <summary>
        /// 删除缩略图
        /// </summary>
        /// <param name="saveFileName"></param>
        public static void DeleteThumbnail(string saveFileName)
        {
            string saveWebPath = Config.GetValue("File:SaveThumbnailWebPath");
            var currentDirectory = Directory.GetCurrentDirectory();
            string fullFileName = Path.Combine(currentDirectory + saveWebPath, saveFileName);
            DeleteFile(fullFileName);
        }

        private static void DeleteFile(string path)
        {
            if (System.IO.File.Exists(path))
                System.IO.File.Delete(path);
        }

        /// <summary>
        /// 获取缩略图
        /// </summary>
        /// <returns>缩略图保存文件名</returns>
        public static string GetThumbnail(string filePath)
        {
            Compress fileCompress = new Compress();

            var extension = Path.GetExtension(filePath);
            string thumbnailName = extension.ToLower() switch
            {
                ".gif" => fileCompress.GetGIFThumbnail(filePath),
                _ => fileCompress.MakeThumbnail(filePath)
            };
            return thumbnailName;
        }

        /// <summary>
        /// 拼接成可访问路径
        /// </summary>
        /// <param name="saveName"></param>
        /// <returns></returns>
        public static string GetVisitablePath(string saveName, bool addPrefex = false)
        {
            var path = (SaveWebPath.StartsWith("/") ? "" : "/") + 
                (SaveWebPath.EndsWith("/") ? SaveWebPath : SaveWebPath + "/") + saveName ?? throw new ArgumentNullException("路径不能为null");
            if (addPrefex)
                return "api" + path;
            return path;
        }
    }
}
