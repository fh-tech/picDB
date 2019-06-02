namespace backend_data_access
{
    public class PictureQuery
    {
        public int Start { get; set; } = 0;
        public int End { get; set; } = -1;
        public string QueryString { get; set; } = "";

        public FetchType type { get; set; } = FetchType.Full;
    }

    public enum FetchType
    {
        Full,
        PathsOnly
    }
}
